import { AfterViewInit, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { concatAll, pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ShowGettingStartedService } from '@scaleo/feature/manager/getting-started/shared/service';
import {
    MANAGER_OFFER_LIST_PROVIDER,
    ManagerOfferListQuery,
    ManagerOfferListService
} from '@scaleo/feature/manager/offer/list/data-access';
import {
    MANAGER_OFFER_LIST_NAVIGATION_COUNT_PROVIDER,
    MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN,
    ManagerOfferListNavigationCountInterface
} from '@scaleo/feature/manager/offer/list/navigation/service';
import { OfferUpsertComponent } from '@scaleo/feature/manager/offer/upsert/modal-form';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import { PlatformCountsOfferModel } from '@scaleo/platform/counts/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { ManagerOfferListFiltersComponent } from './filters/manager-offer-list-filters.component';

@Component({
    selector: 'app-offers',
    templateUrl: './manager-offers.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        },
        ShowGettingStartedService,
        MANAGER_OFFER_LIST_PROVIDER,
        MANAGER_OFFER_LIST_NAVIGATION_COUNT_PROVIDER
    ]
})
export class ManagerOffersComponent implements OnInit, AfterViewInit, OnDestroy {
    // public navCounts$: Observable<PlatformCountsOfferModel> = this.platformCountsService.counts$.pipe(pluck('offers'));

    readonly offers$ = this.managerOfferListQuery.selectAll();

    firstOfferId$: Observable<number> = this.offers$.pipe(
        concatAll(),
        take(1),
        map(({ id = undefined }) => id)
    );

    public pagination$ = this.managerOfferListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly params$ = this.managerOfferListQuery.selectParams$();

    readonly isLoad$ = this.managerOfferListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    readonly showHint$ = this.showGettingStartedService.showHint(
        this.isLoad$,
        this.offers$,
        this.permissions.canAddEditDeleteOffers,
        'gettingStartedOffer'
    );

    @ViewChild(ManagerOfferListFiltersComponent) offersListFiltersComponent: ManagerOfferListFiltersComponent;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('openModalContainer', { static: true })
    private readonly openModalContainer: TemplateRef<HTMLElement>;

    @ViewChild('hintContainer', { static: true })
    private readonly hintContainer: TemplateRef<HTMLElement>;

    constructor(
        @Inject(MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN)
        private readonly managerOfferListNavigationService: ManagerOfferListNavigationCountInterface<PlatformCountsOfferModel>,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly shared: SharedMethodsService,
        private readonly managerOfferListQuery: ManagerOfferListQuery,
        private readonly managerOfferListService: ManagerOfferListService,
        @Inject(OFFERS_LAYOUT) private readonly offersLayoutComponent: OffersLayoutComponent,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3: Modal3Service,
        private readonly showGettingStartedService: ShowGettingStartedService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.loadItems();
        this.checkUrl();
    }

    ngAfterViewInit(): void {
        this.offersLayoutComponent.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
        this.offersLayoutComponent.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
        this.offersLayoutComponent.createContainer(this.openModalContainer, OffersLayoutContainersEnum.OpenModal);
        this.offersLayoutComponent.createContainer(this.hintContainer, OffersLayoutContainersEnum.Hint);
    }

    ngOnDestroy(): void {
        this.offersLayoutComponent.clearContainer(OffersLayoutContainersEnum.Hint);
    }

    public openModal(editId?: number): void {
        const modalRef = this.modal3.editForm(OfferUpsertComponent, {
            data: {
                editId: editId || null
            }
        });

        modalRef.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Delete, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.managerOfferListService.reload();
                this.managerOfferListNavigationService.getCounts();
            });
    }

    public pageWasChanged(page: number): void {
        this.managerOfferListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: 1
            },
            queryParamsHandling: 'merge'
        });
        this.managerOfferListService.updateParamsValue({ perPage, page: 1 });
    }

    public loadItems(): void {
        this.managerOfferListService.list().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private checkUrl(): void {
        this.shared
            .checkQueryParams('create')
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res: boolean) => {
                if (res) {
                    this.openModal();
                }
            });
    }

    sortingColumn(sort: UiTable2SortColumnModel): void {
        this.managerOfferListService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    export(format: SheetExtensionType): void {
        this.managerOfferListService.export(format).pipe(take(1)).subscribe();
    }

    searching(search: string) {
        this.managerOfferListService.updateParamsValue({ search });
    }
}
