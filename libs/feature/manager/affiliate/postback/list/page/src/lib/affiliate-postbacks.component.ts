import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, pluck } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PostbackListService } from '@scaleo/affiliate/postback/list/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailCountsService, AffiliateDetailQuery } from '@scaleo/feature/manager/affiliate/detail/data-access';
import {
    MANAGER_AFFILIATE_POSTBACK_LIST_PROVIDER,
    ManagerAffiliatePostbackListQuery,
    ManagerAffiliatePostbackListService
} from '@scaleo/feature/manager/affiliate/postback/list/data-access';
import { ManagerPostbackCreateComponent } from '@scaleo/feature/manager/affiliate/postback/upsert/modal-form';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil, NavigateRootService } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-affiliate-postbacks',
    templateUrl: './affiliate-postbacks.component.html',
    providers: [UnsubscribeService, MANAGER_AFFILIATE_POSTBACK_LIST_PROVIDER]
})
export class AffiliatePostbacksComponent implements OnInit {
    readonly affiliateId: number = this.affiliateDetailQuery.getValue().id;

    postback_statuses: string;

    filterForm: FormGroup;

    readonly items$ = this.managerAffiliatePostbackListQuery.selectAll();

    readonly pagination$ = this.managerAffiliatePostbackListQuery.selectDataValue$('pagination');

    readonly counts$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.managerAffiliatePostbackListQuery.loading$;

    readonly isLoad$ = this.managerAffiliatePostbackListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.counts$);

    readonly columns: UiTable2ColumnsModel[] = [
        {
            value: 'status',
            translate: 'table.column.status',
            colWidth: '10%'
        },
        {
            value: 'level',
            translate: 'table.column.level',
            colWidth: '55%'
        },
        {
            value: 'conversion_status',
            translate: 'table.column.conversion_status',
            colWidth: '15%'
        },
        {
            value: 'postback',
            translate: 'table.column.postback',
            colWidth: '20%'
        }
    ];

    @Output() changedEvent: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public platformListsService: PlatformListsService,
        private readonly modal3Service: Modal3Service,
        private translate: TranslateService,
        protected profileQuery: ProfileQuery,
        private toastr: ToastrBarService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly affiliatePostbackService: PostbackListService,
        private readonly managerAffiliatePostbackListQuery: ManagerAffiliatePostbackListQuery,
        private readonly managerAffiliatePostbackListService: ManagerAffiliatePostbackListService,
        private readonly fb: FormBuilder,
        private readonly navigateRootService: NavigateRootService,
        private readonly affiliateDetailCountsService: AffiliateDetailCountsService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit() {
        this.initFilterForm();
        this.managerAffiliatePostbackListQuery.reloading$
            .pipe(
                startWith(''),
                switchMap(() => this.managerAffiliatePostbackListService.index()),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(ManagerPostbackCreateComponent, {
            data: {
                affiliateId: this.affiliateId,
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.managerAffiliatePostbackListService.reload();
                this.affiliateDetailCountsService.update();
            });
    }

    setFilterStatus(event: SelectChangeModel) {
        this.managerAffiliatePostbackListService.updateParamsValue({ status: event?.newValue });
    }

    pageWasChanged(page: number) {
        this.managerAffiliatePostbackListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number) {
        this.managerAffiliatePostbackListService.updateParamsValue({ perPage, page: 1 });
    }

    showInfo(trackingTemplate: TemplateRef<any>, title: string) {
        this.modal3Service.info(trackingTemplate, {
            title: this.translate.instant(`affiliate.postback.${title.toLowerCase()}`)
        });
    }

    navigate(path: string, offerId: number) {
        let url = this.navigateRootService.path(`/offers/${offerId}`);
        if (path === 'goals') {
            url += 'goals';
        }
        this.navigateRootService.navigate(url);
    }

    private initFilterForm(): void {
        this.filterForm = this.fb.group({
            status: [this.managerAffiliatePostbackListQuery.getParams()?.status]
        });
    }
}
