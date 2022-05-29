import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import {
    AdvertiserOfferListModel,
    AdvertiserOfferListQuery,
    AdvertiserOfferListService
} from '@scaleo/feature/advertiser/offer/list/data-access';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTable2ColumnDirectionType, UiTable2ColumnsModel, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { advertiserOfferListTableColumns } from './configs/advertiser-offer-list-table-columns.config';

@Component({
    selector: 'scaleo-advertiser-offer-list',
    templateUrl: './advertiser-offer-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserOfferListComponent {
    @Input() items: AdvertiserOfferListModel[];

    @Input() rowTemplate: TemplateRef<any>;

    @Output() editModal: EventEmitter<number> = new EventEmitter<number>();

    @Output() sorting: EventEmitter<UiTable2SortColumnModel> = new EventEmitter<UiTable2SortColumnModel>();

    readonly tableHeaders: UiTable2ColumnsModel[] = advertiserOfferListTableColumns;

    public offersVisibilityIdEnum = OffersVisibilityIdEnum;

    public readonly sortField$: Observable<string> = this.advertiserOfferListQuery.selectParams$().pipe(pluck('sortField'));

    public readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.advertiserOfferListQuery
        .selectParams$()
        .pipe(pluck('sortDirection'));

    public readonly loading$: Observable<boolean> = this.advertiserOfferListQuery.selectLoading();

    public readonly ePCKey = this.getEPCKey;

    constructor(
        public shared: SharedMethodsService,
        private router: Router,
        private advertiserOfferListService: AdvertiserOfferListService,
        private advertiserOfferListQuery: AdvertiserOfferListQuery
    ) {}

    toLink(to: 'statistics' | 'conversions' | 'clicks', id: number): void {
        const urlMap: BaseObjectModel = {
            statistics: '/advertiser/reports/statistics/day',
            conversions: '/advertiser/transactions/conversions',
            clicks: '/advertiser/transactions/clicks'
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

    private get getEPCKey(): string {
        return 'cpc';
    }
}
