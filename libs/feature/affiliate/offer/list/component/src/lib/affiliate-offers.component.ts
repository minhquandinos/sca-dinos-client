import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_OFFER_LIST_PROVIDER,
    AffiliateOfferListQuery,
    AffiliateOfferListService
} from '@scaleo/feature/affiliate/offer/list/data-access';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import { SheetExtensionType } from '@scaleo/platform/data';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { AffiliateOffersListFiltersComponent } from './filters/affiliate-offers-list-filters.component';

@Component({
    selector: 'scaleo-affiliate-offers',
    templateUrl: './affiliate-offers.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        },
        AFFILIATE_OFFER_LIST_PROVIDER
    ]
})
export class AffiliateOffersComponent implements OnInit, AfterViewInit {
    readonly offers$ = this.affiliateOfferListQuery.selectAll();

    readonly pagination$ = this.affiliateOfferListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly params$ = this.affiliateOfferListQuery.selectParams$();

    readonly loading$ = this.affiliateOfferListQuery.loading$;

    readonly isLoad$ = this.affiliateOfferListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    @ViewChild(AffiliateOffersListFiltersComponent) offersListFiltersComponent: AffiliateOffersListFiltersComponent;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('navigationContainer', { static: true })
    private readonly navigationContainer: TemplateRef<HTMLElement>;

    constructor(
        private route: ActivatedRoute,
        private shared: SharedMethodsService,
        private affiliateOfferListQuery: AffiliateOfferListQuery,
        private affiliateOfferListService: AffiliateOfferListService,
        @Inject(OFFERS_LAYOUT) private offersLayoutComponent: OffersLayoutComponent,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.offersLayoutComponent.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
        this.offersLayoutComponent.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
    }

    public pageWasChanged(page: number): void {
        this.affiliateOfferListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.affiliateOfferListService.updateParamsValue({ perPage });
    }

    public loadItems(): void {
        this.affiliateOfferListService.list().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    sortingColumn(sort: UiTable2SortColumnModel): void {
        this.affiliateOfferListService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    export(format: SheetExtensionType): void {
        this.affiliateOfferListService.export(format).pipe(take(1)).subscribe();
    }

    searching(search: string) {
        this.affiliateOfferListService.updateParamsValue({ search, page: 1 });
    }
}
