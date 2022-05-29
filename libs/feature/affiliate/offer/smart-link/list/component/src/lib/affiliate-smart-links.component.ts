import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck, share, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_SMART_LINK_LIST_PROVIDER,
    AffiliateOfferSmartLinkListModel,
    AffiliateSmartLinkListQuery,
    AffiliateSmartLinkListService
} from '@scaleo/feature/affiliate/offer/smart-link/list/data-access';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import {
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderSmartLinkConfigModel
} from '@scaleo/offer/link-builder/common';
import { SmartLinkLinkBuilderComponent } from '@scaleo/offer/link-builder/smart-link';
import { SmartLinkStatusesEnum } from '@scaleo/offer/smart-link/common';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-smart-links',
    templateUrl: './affiliate-smart-links.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        },
        AFFILIATE_SMART_LINK_LIST_PROVIDER
    ]
})
export class AffiliateSmartLinksComponent implements OnInit, AfterViewInit {
    readonly items$: Observable<AffiliateOfferSmartLinkListModel[]> = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.query.selectLoading();

    readonly params$ = this.query.selectParams$();

    readonly tableHeaders: UiTable2ColumnsModel[] = [
        {
            value: 'smart_link',
            translate: 'smart_link_page.title',
            colWidth: '30%'
        },
        {
            value: 'types',
            translate: 'smart_link_page.table.allowed_traffic_types',
            colWidth: '30%'
        },
        {
            value: 'description',
            translate: 'interface.form.description',
            colWidth: '30%'
        },
        {
            value: 'tracking_link',
            translate: 'table.column.tracking_url',
            colWidth: '10%'
        }
    ];

    readonly smartLinkStatus = SmartLinkStatusesEnum;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('openModalContainer', { static: true })
    private readonly openModalContainer: TemplateRef<HTMLElement>;

    fakeRows = this.sharedMethods.generateFake(4);

    showPagination$ = combineLatest([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    constructor(
        private service: AffiliateSmartLinkListService,
        private query: AffiliateSmartLinkListQuery,
        private unsubscribe: UnsubscribeService,
        @Inject(OFFERS_LAYOUT) private offersLayoutComponent: OffersLayoutComponent,
        private headerService: PageTitleService,
        private route: ActivatedRoute,
        private sharedMethods: SharedMethodsService,
        private readonly modal3: Modal3Service,
        private readonly router: Router,
        private profileQuery: ProfileQuery
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.offersLayoutComponent.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
        this.offersLayoutComponent.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
        this.offersLayoutComponent.createContainer(this.openModalContainer, OffersLayoutContainersEnum.OpenModal);
    }

    getLink(id: number, trackingDomain: string) {
        const config: TargetingLinkBuilderSmartLinkConfigModel = {
            type: TargetingLinkBuilderEnum.SmartLink,
            id,
            affiliateId: this.profileQuery.profile.id,
            isAffiliateAccess: true
        };

        const data: TargetingLinkBuilderInputDataModel = {
            trackingDomain,
            config
        };

        this.modal3.editForm<any, TargetingLinkBuilderInputDataModel>(SmartLinkLinkBuilderComponent, {
            data
        });
    }

    public pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number) {
        this.service.updateParamsValue({ perPage });
    }

    private loadItems(): void {
        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    public toLink(to: 'statistics' | 'conversions' | 'clicks', id: number) {
        const urlMap: BaseObjectModel = {
            statistics: '/advertiser/reports/statistics/day',
            conversions: '/advertiser/transactions/conversions',
            clicks: '/advertiser/transactions/clicks'
        };

        const url = urlMap[to];

        if (url) {
            this.router.navigate([url], {
                queryParams: {
                    [ReportFilterFilterEnum.SmartLinks]: id
                }
            });
        }
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }
}
