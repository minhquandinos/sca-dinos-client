import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_OFFER_REQUEST_LIST_PROVIDER,
    OffersRequestsQuery,
    OffersRequestsService
} from '@scaleo/feature/manager/offer/request/list/data-access';
import {
    MANAGER_OFFER_REQUEST_SOLVE_PROVIDER,
    OfferRequestSolveService,
    OfferRequestType
} from '@scaleo/feature/manager/offer/request/solve/data-access';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { SelectRowModel, UiTable2Component, UiTable2SortModel } from '@scaleo/ui-kit/elements';

import { offersRequestsColumnsConfig } from './config/offers-requests-columns.config';

@Component({
    selector: 'app-offers-requests',
    templateUrl: './offers-requests.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MANAGER_OFFER_REQUEST_LIST_PROVIDER,
        MANAGER_OFFER_REQUEST_SOLVE_PROVIDER,
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        }
    ]
})
export class OffersRequestsComponent implements OnInit, AfterViewInit, OnDestroy {
    items$ = this.query.selectAll();

    columns = offersRequestsColumnsConfig;

    defaultSortField$ = this.query.defaultSortField$;

    defaultSortDirection$ = this.query.defaultSortDirection$;

    pagination$ = this.query.pagination$;

    showPagination$ = this.query.showPagination$;

    readonly loading$ = this.query.selectLoading();

    readonly maxQuestionLength = 80;

    readonly offerRequestStatusEnum = OfferRequestStatusEnum;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild(UiTable2Component, { static: true })
    private readonly table2Ref: UiTable2Component;

    private _selectedRows$: BehaviorSubject<SelectRowModel<number>[]> = new BehaviorSubject<SelectRowModel<number>[]>([]);

    readonly selectedRows$ = this._selectedRows$.asObservable();

    readonly showFilters$ = this._selectedRows$.pipe(map((rows) => !rows.length));

    constructor(
        private readonly query: OffersRequestsQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly offersRequestsService: OffersRequestsService,
        @Inject(OFFERS_LAYOUT) private readonly offersLayout: OffersLayoutComponent,
        private readonly platformCountsService: PlatformCountsService,
        private readonly offerRequestSolveService: OfferRequestSolveService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.offersLayout.clearContainer(OffersLayoutContainersEnum.OpenModal);
        this.offersRequestsService.index().pipe(takeUntil(this.unsubscribe)).subscribe();

        setTimeout(() => {
            this.offersRequestsService.reload();
        }, 5000);
    }

    ngAfterViewInit(): void {
        this.createLayoutContainers();
    }

    ngOnDestroy(): void {
        this.offersLayout.clearContainer(OffersLayoutContainersEnum.OpenModal);
        this.offersLayout.clearContainer(OffersLayoutContainersEnum.Footer);
        this.offersLayout.clearContainer(OffersLayoutContainersEnum.Filter);
    }

    private createLayoutContainers(): void {
        this.offersLayout.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
        this.offersLayout.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
    }

    selectAll(event: SelectRowModel<number>[]): void {
        this._selectedRows$.next(event);
    }

    pageWasChanged(page: number): void {
        this.offersRequestsService.setPage(page);
    }

    perPageWasChange(perPage: number): void {
        this.offersRequestsService.setPerPage(perPage);
    }

    changeOfferRequest(): void {
        this.offersRequestsService.reload();
        this.platformCountsService.update();
    }

    clearSelected(): void {
        this._selectedRows$.next([]);
        this.table2Ref.clearSelected();
    }

    solvedMultiSelected(type: OfferRequestType): void {
        this.offerRequestSolveService
            .updateStatus(this.selectedRows, type)
            .pipe(
                tap(() => {
                    this.clearSelected();
                    this.solvedRequest();
                }),
                take(1)
            )
            .subscribe();
    }

    solvedRequest(): void {
        this.offersRequestsService.reload();
        this.platformCountsService.update();
    }

    private get selectedRows(): number[] {
        return this._selectedRows$.value.map(({ value }) => value);
    }

    sort({ current }: UiTable2SortModel): void {
        this.offersRequestsService.sort(current);
    }
}
