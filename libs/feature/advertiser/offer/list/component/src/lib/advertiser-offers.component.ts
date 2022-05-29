import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    ADVERTISER_OFFER_LIST_PROVIDER,
    AdvertiserOfferListQuery,
    AdvertiserOfferListService
} from '@scaleo/feature/advertiser/offer/list/data-access';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { AdvertiserOfferListFiltersComponent } from './filters/advertiser-offer-list-filters.component';

@Component({
    selector: 'scaleo-advertiser-offers',
    templateUrl: './advertiser-offers.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        },
        ADVERTISER_OFFER_LIST_PROVIDER
    ]
})
export class AdvertiserOffersComponent implements OnInit, AfterViewInit {
    readonly navCounts$: Observable<any> = this.platformCountsService.counts$.pipe(
        pluck('offers'),
        map((offers) => {
            return offers as any;
        })
    );

    readonly offers$ = this.advertiserOfferListQuery.selectAll();

    readonly pagination$ = this.advertiserOfferListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly params$ = this.advertiserOfferListQuery.selectParams$();

    readonly isLoad$ = this.advertiserOfferListQuery.isLoad$;

    readonly loading$ = this.advertiserOfferListQuery.loading$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    @ViewChild(AdvertiserOfferListFiltersComponent) offersListFiltersComponent: AdvertiserOfferListFiltersComponent;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    constructor(
        private platformCountsService: PlatformCountsService,
        private route: ActivatedRoute,
        private shared: SharedMethodsService,
        private advertiserOfferListService: AdvertiserOfferListService,
        private advertiserOfferListQuery: AdvertiserOfferListQuery,
        @Inject(OFFERS_LAYOUT) private offersLayoutComponent: OffersLayoutComponent,
        private unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.offersLayoutComponent.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
        this.offersLayoutComponent.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
    }

    public pageWasChanged(page: number): void {
        this.advertiserOfferListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.advertiserOfferListService.updateParamsValue({ perPage });
    }

    public loadItems(): void {
        this.advertiserOfferListService.list().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    sortingColumn(sort: UiTable2SortColumnModel): void {
        this.advertiserOfferListService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    export(format: SheetExtensionType): void {
        this.advertiserOfferListService.export(format).pipe(take(1)).subscribe();
    }

    searching(search: string) {
        this.advertiserOfferListService.updateParamsValue({ search, page: 1 });
    }
}
