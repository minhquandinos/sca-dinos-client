import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, pluck, switchMap, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailCountsService, AffiliateDetailQuery } from '@scaleo/feature/manager/affiliate/detail/data-access';
import { DOMAIN_LIST_PROVIDER, DomainListQuery, DomainListService } from '@scaleo/feature/manager/affiliate/domain/data-access';
import { AffiliateDomainCreateComponent } from '@scaleo/feature/manager/affiliate/domain/upsert';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-affiliate-domain-list',
    templateUrl: './affiliate-domain.component.html',
    providers: [UnsubscribeService, DOMAIN_LIST_PROVIDER]
})
export class AffiliateDomainComponent implements OnInit {
    items$ = this.domainListQuery.selectAll();

    readonly affiliateId = this.affiliateDetailQuery.getValue().id;

    editId: number;

    filterForm: FormGroup;

    readonly pagination$ = this.domainListQuery.selectDataValue$('pagination');

    readonly counts$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.domainListQuery.loading$;

    readonly isLoad$ = this.domainListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.counts$);

    readonly columns: UiTable2ColumnsModel[] = [
        {
            value: 'status',
            translate: 'table.column.status',
            colWidth: '8%'
        },
        {
            value: 'tracking_domain',
            translate: 'table.column.tracking_domain',
            colWidth: '20%'
        },
        {
            value: 'configuration',
            translate: 'table.column.configuration',
            colWidth: '70%'
        }
    ];

    readonly exceptPendingStatus = [PlatformListsStatusesEnum.Pending];

    constructor(
        public shared: SharedMethodsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private readonly fb: FormBuilder,
        private readonly unsubscribe: UnsubscribeService,
        private readonly domainListService: DomainListService,
        private readonly domainListQuery: DomainListQuery,
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly affiliateDetailCountsService: AffiliateDetailCountsService,
        private readonly modal3Service: Modal3Service,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.initFilterForm();
        this.affiliateDetailQuery
            .select('id')
            .pipe(
                switchMap((id) => this.domainListService.index(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    public openModal(editId?: number) {
        const modal$ = this.modal3Service.editForm(AffiliateDomainCreateComponent, {
            data: {
                editId: editId || null,
                affiliateId: this.affiliateId
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
                this.domainListService.reload();
                this.affiliateDetailCountsService.update();
            });
    }

    public setFilterStatus({ newValue }: SelectChangeModel): void {
        this.domainListService.updateParamsValue({ status: newValue });
    }

    public back() {
        this.router.navigate(['/affiliates', this.affiliateId]);
    }

    public pageWasChanged(page: number): void {
        this.domainListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number) {
        this.domainListService.updateParamsValue({ perPage, page: 1 });
    }

    private initFilterForm(): void {
        this.filterForm = this.fb.group({
            status: [this.domainListQuery.getParams()?.status]
        });
    }
}
