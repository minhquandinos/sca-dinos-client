import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ManagerOfferListModel, ManagerOfferListQuery, ManagerOfferListService } from '@scaleo/feature/manager/offer/list/data-access';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTable2ColumnDirectionType, UiTable2ColumnsModel, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { MANAGER_OFFER_LIST_COLUMNS_FACTORY, OFFER_LIST_TABLE_COLUMNS_TOKEN } from './configs/manager-offer-list-table-columns.config';

@Component({
    selector: 'app-offers-list',
    templateUrl: './manager-offer-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, MANAGER_OFFER_LIST_COLUMNS_FACTORY]
})
export class ManagerOfferListComponent {
    @Input() items: ManagerOfferListModel[];

    @Input() rowTemplate: TemplateRef<any>;

    @Output() editModal: EventEmitter<number> = new EventEmitter<number>();

    @Output() sorting: EventEmitter<UiTable2SortColumnModel> = new EventEmitter<UiTable2SortColumnModel>();

    readonly tableHeaders: UiTable2ColumnsModel[] = this.tableColumns;

    public offersVisibilityIdEnum = OffersVisibilityIdEnum;

    public role = this.profileQuery.role;

    public readonly sortField$: Observable<string> = this.offersQuery.selectParams$().pipe(pluck('sortField'));

    public readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.offersQuery.selectParams$().pipe(pluck('sortDirection'));

    public readonly loading$: Observable<boolean> = this.offersQuery.selectLoading();

    public readonly ePCKey = this.getEPCKey;

    constructor(
        public shared: SharedMethodsService,
        private profileQuery: ProfileQuery,
        private offersQuery: ManagerOfferListQuery,
        private offers2Service: ManagerOfferListService,
        private platformSettingsQuery: PlatformSettingsQuery,
        @Inject(OFFER_LIST_TABLE_COLUMNS_TOKEN) private tableColumns: UiTable2ColumnsModel[],
        private readonly unsubscribe: UnsubscribeService,
        private readonly navigateRootService: NavigateRootService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly checkPermissionService: CheckPermissionService
    ) {}

    openModal(editId: number): void {
        this.editModal.emit(editId);
    }

    toLink(to: 'statistics' | 'conversions' | 'clicks', id: number): void {
        const urlMap: BaseObjectModel = {
            statistics: '/reports/statistics/day',
            conversions: '/transactions/conversions',
            clicks: '/transactions/clicks'
        };

        const url = urlMap[to];

        if (url) {
            this.navigateRootService.navigate(url, {
                [ReportFilterFilterEnum.Offer]: id
            });
        }
    }

    sortWasChanged(sort: UiTable2SortColumnModel): void {
        this.sorting.emit(sort);
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }

    offerWasDuplicated(newOfferId: number) {
        this.router.navigate(['..', newOfferId], { relativeTo: this.route });
    }

    private get getEPCKey(): 'aff_epc' | 'epc' {
        if (this.checkPermissionService.check(this.permissions.frontShowAffEpcKeyOffers)) {
            return 'aff_epc';
        }
        return 'epc';
    }
}
