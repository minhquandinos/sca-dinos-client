import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AffiliateOfferListModel,
    AffiliateOfferListQuery,
    AffiliateOfferListService
} from '@scaleo/feature/affiliate/offer/list/data-access';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTable2ColumnDirectionType, UiTable2ColumnsModel, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import {
    AFFILIATE_OFFER_LIST_TABLE_COLUMNS_TOKEN,
    AffiliateOffersListTableColumnsProvider
} from './affiliate-offers-list-table-columns.provider';

@Component({
    selector: 'scaleo-affiliate-offers-list',
    templateUrl: './affiliate-offers-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, AffiliateOffersListTableColumnsProvider]
})
export class AffiliateOffersListComponent {
    @Input() items: AffiliateOfferListModel[];

    @Input() rowTemplate: TemplateRef<any>;

    @Output() editModal: EventEmitter<number> = new EventEmitter<number>();

    @Output() sorting: EventEmitter<UiTable2SortColumnModel> = new EventEmitter<UiTable2SortColumnModel>();

    readonly tableHeaders: UiTable2ColumnsModel[] = this.tableColumns;

    public offersVisibilityIdEnum = OffersVisibilityIdEnum;

    public role = this.profileQuery.role;

    public readonly sortField$: Observable<string> = this.affiliateOfferListQuery.selectParams$().pipe(pluck('sortField'));

    public readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.affiliateOfferListQuery
        .selectParams$()
        .pipe(pluck('sortDirection'));

    public readonly loading$: Observable<boolean> = this.affiliateOfferListQuery.selectLoading();

    public readonly showArProperty = this.getShowArPropertyValue;

    public readonly ePCKey = this.getEPCKey;

    constructor(
        public shared: SharedMethodsService,
        private profileQuery: ProfileQuery,
        private affiliateOfferListQuery: AffiliateOfferListQuery,
        private affiliateOfferListService: AffiliateOfferListService,
        @Inject(AFFILIATE_OFFER_LIST_TABLE_COLUMNS_TOKEN) private tableColumns: UiTable2ColumnsModel[],
        private readonly unsubscribe: UnsubscribeService,
        private readonly router: Router,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    openModal(editId: number): void {
        this.editModal.emit(editId);
    }

    toLink(to: 'statistics' | 'conversions' | 'clicks', id: number): void {
        const urlMap: BaseObjectModel = {
            statistics: '/affiliate/reports/statistics/day',
            conversions: '/affiliate/transactions/conversions',
            clicks: '/affiliate/transactions/clicks'
        };

        const url = urlMap[to];

        if (url) {
            this.router.navigate([url], {
                queryParams: {
                    [ReportFilterFilterEnum.Offer]: id
                }
            });
        }
    }

    sortWasChanged(sort: UiTable2SortColumnModel): void {
        this.sorting.emit(sort);
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }

    private get getShowArPropertyValue(): boolean {
        return !this.checkPermissionService.check(this.permissions.canSeePendingConv);
    }

    private get getEPCKey(): string {
        return 'aff_epc';
    }
}
