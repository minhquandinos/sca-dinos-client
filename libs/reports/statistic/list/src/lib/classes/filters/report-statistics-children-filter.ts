import {
    StatisticDefaultRowModel,
    StatisticRowCountryModel,
    StatisticRowHourModel,
    StatisticRowRelationModel,
    StatisticRowType
} from '@scaleo/reports/common';
import { ReportFilterUnionType } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum, ReportStatisticsBreakdownFilterMap } from '@scaleo/reports/statistic/common';
import { Post2FiltersInterface, RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ReportStatisticsChildrenDate } from './dates/report-statistics-children-date';
import { ReportStatisticsChildrenFilterDateModel } from './dates/report-statistics-children-filter-date.model';

export class ReportStatisticsChildrenFilter {
    constructor(
        private _nextBreakdown: BreakdownEnum,
        private _currentBreakdown: BreakdownEnum,
        private _filter: RequestPayloadFilter2Interface,
        private _item: StatisticRowType,
        private _date: ReportStatisticsChildrenFilterDateModel
    ) {
        let x = 5;
        x ??= 200;

        console.log(x);
    }

    get payload(): Post2FiltersInterface {
        return {
            filters: this._payloadFilters,
            breakdown: this._payloadBreakdown
        };
    }

    get getDate(): ReportStatisticsChildrenDate {
        return new ReportStatisticsChildrenDate(this._nextBreakdown, this._currentBreakdown, this._item, this._date);
    }

    private get _payloadFilters(): RequestPayloadFilter2Interface {
        if (typeof this._item === 'string') {
            return this._prepareFilterWhenBreakdownIsSimple;
        }

        if (typeof this._item === 'object') {
            return this._prepareFilterWhenBreakdownIsObject;
        }

        return this._filter;
    }

    private get _payloadBreakdown(): string {
        return this._nextBreakdown;
    }

    private get _prepareFilterWhenBreakdownIsSimple(): RequestPayloadFilter2Interface {
        return {
            ...this._filter,
            ...this._prepareFilter(this._item as string)
        };
    }

    private get _prepareFilterWhenBreakdownIsObject(): RequestPayloadFilter2Interface {
        return {
            ...this._filter,
            ...this._prepareFilterByBreakdown
        };
    }

    private _prepareFilter(value: string | number, filterKey?: ReportFilterUnionType): RequestPayloadFilter2Interface {
        const newFilterKey = filterKey || this._filterKeyByBreakdown;
        return newFilterKey ? { [newFilterKey]: value?.toString() || '' } : {};
    }

    private get _filterKeyByBreakdown(): ReportFilterUnionType {
        return ReportStatisticsBreakdownFilterMap.breakdownFilters(this._currentBreakdown);
    }

    private get _prepareFilterByBreakdown(): RequestPayloadFilter2Interface {
        let item;
        switch (this._currentBreakdown) {
            case BreakdownEnum.Affiliate:
            case BreakdownEnum.Offer:
            case BreakdownEnum.Advertiser:
            case BreakdownEnum.GoalType:
            case BreakdownEnum.AffiliateSource:
            case BreakdownEnum.DeviceType:
            case BreakdownEnum.DeviceModel:
            case BreakdownEnum.DeviceBrand:
            case BreakdownEnum.DeviceOS:
            case BreakdownEnum.Browser:
            case BreakdownEnum.Language:
            case BreakdownEnum.ConnectionType:
            case BreakdownEnum.MobileOperator:
            case BreakdownEnum.SmartLink:
            case BreakdownEnum.PaidToAffiliate:
            case BreakdownEnum.AffiliateManager:
            case BreakdownEnum.AdvertiserManager:
            case BreakdownEnum.AffiliateInvoice:
                item = this._item as StatisticDefaultRowModel;
                return this._prepareFilter(item?.id);
            case BreakdownEnum.Country:
                item = this._item as StatisticRowCountryModel;
                return this._prepareFilter(item?.id);
            case BreakdownEnum.Goals:
            case BreakdownEnum.Creative:
            case BreakdownEnum.LandingPage:
                item = this._item as StatisticRowRelationModel;
                return {
                    ...this._prepareFilter(item?.id),
                    ...this._prepareFilter(item?.parent_id, ReportStatisticsBreakdownFilterMap.breakdownFilters(BreakdownEnum.Offer))
                };
            case BreakdownEnum.AffiliateSubId1:
            case BreakdownEnum.AffiliateSubId2:
            case BreakdownEnum.AffiliateSubId3:
            case BreakdownEnum.AffiliateSubId4:
            case BreakdownEnum.AffiliateSubId5:
                item = this._item as StatisticRowRelationModel;
                return {
                    ...this._prepareFilter(item?.value || 'emptyEmpty'),
                    ...this._prepareFilter(item?.parent_id, ReportStatisticsBreakdownFilterMap.breakdownFilters(BreakdownEnum.Affiliate))
                };
            case BreakdownEnum.Hour:
                item = (this._item as StatisticRowHourModel)?.hour?.toString();
                return this._prepareFilter(item);
            default:
                return {};
        }
    }
}
