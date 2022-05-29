import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable } from 'rxjs';
import { map, pluck, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { PostbackListService } from '@scaleo/affiliate/postback/list/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_LIST_COUNTS_PROVIDER,
    AFFILIATE_POSTBACK_LIST_PROVIDER,
    AffiliateListCountsEnum,
    AffiliateListCountsService,
    AffiliatePostbackListQuery,
    AffiliatePostbackListService
} from '@scaleo/feature/affiliate/tools/postbacks/list/data-access';
import { AffiliatePostbackUpsertComponent } from '@scaleo/feature/affiliate/tools/postbacks/upsert/modal-form';
import { ListNavBarModel, NavigateRootService } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-affiliate-postbacks-page-layout',
    templateUrl: './affiliate-postbacks-list.component.html',
    providers: [UnsubscribeService, AFFILIATE_POSTBACK_LIST_PROVIDER, AFFILIATE_LIST_COUNTS_PROVIDER]
})
export class AffiliatePostbacksListComponent implements OnInit {
    readonly navigation$: Observable<ListNavBarModel[]> = this.navigationStream$;

    postback_statuses: string;

    filterForm: FormGroup;

    readonly navigation: ListNavBarModel[] = [
        {
            id: AffiliateListCountsEnum.Total,
            title: 'affiliate.postback.all_postbacks',
            routeLink: '../../../all',
            count: 0
        }
    ];

    items$ = this.affiliatePostbackListQuery.selectAll();

    pagination$ = this.affiliatePostbackListQuery.selectDataValue$('pagination');

    counts$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    loading$ = this.affiliatePostbackListQuery.selectLoading();

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

    constructor(
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3Service: Modal3Service,
        private readonly affiliatePostbacksService: PostbackListService,
        private readonly affiliatePostbackListQuery: AffiliatePostbackListQuery,
        private readonly affiliatePostbackListService: AffiliatePostbackListService,
        private readonly translate: TranslateService,
        private readonly navigateRootService: NavigateRootService,
        private readonly fb: FormBuilder,
        private readonly affiliateListCountsService: AffiliateListCountsService
    ) {}

    ngOnInit() {
        this.initFilterForm();
        this.affiliatePostbackListQuery.reloading$
            .pipe(
                startWith(''),
                switchMap(() => this.affiliatePostbackListService.index()),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(AffiliatePostbackUpsertComponent, {
            data: {
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
                this.affiliatePostbackListService.reload();
                this.affiliateListCountsService.update();
            });
    }

    setFilterStatus(event: SelectChangeModel) {
        this.affiliatePostbackListService.updateParamsValue({ status: event?.newValue });
    }

    searching(search: string) {
        this.affiliatePostbackListService.updateParamsValue({ search, page: 1 });
    }

    pageWasChanged(page: number) {
        this.affiliatePostbackListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number) {
        this.affiliatePostbackListService.updateParamsValue({ perPage });
    }

    showInfo(trackingTemplate: TemplateRef<any>, title: string) {
        this.modal3Service.info(trackingTemplate, {
            title: this.translate.instant(`affiliate.postback.${title.toLowerCase()}`)
        });
    }

    navigate(path: 'offers' | 'goals', offerId: number) {
        let url = `/offers/${offerId}`;
        if (path === 'goals') {
            url += 'goals';
        }
        this.navigateRootService.navigate(url);
    }

    private initFilterForm(): void {
        this.filterForm = this.fb.group({
            status: [this.affiliatePostbackListQuery.getParams()?.status]
        });
    }

    // TODO create abstract method for update navigation counter
    private get navigationStream$(): Observable<ListNavBarModel[]> {
        return this.affiliateListCountsService.counts().pipe(
            map((response) => {
                if (response) {
                    const countKey = {
                        [AffiliateListCountsEnum.Total]: response.total
                    };
                    return this.navigation.map((nav) => ({
                        ...nav,
                        count: (countKey as any)[nav.id]
                    }));
                }
                return [];
            })
        );
    }
}
