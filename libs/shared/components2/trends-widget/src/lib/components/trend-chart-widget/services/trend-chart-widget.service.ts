import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

import {
    NetworkSummaryBodyWidgetDto,
    NetworkSummaryQueryParamsWidgetDto,
    NetworkSummeryWidgetApi
} from '@scaleo/dashboard/shared/widgets/network-summary/data-access';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeUtil, DateUtil } from '@scaleo/platform/date/util';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { TrendsWidgetService } from '../../../services/trends-widget.service';
import { TrendChartFiltersType } from '../type/trend-chart-widget.type';

@Injectable()
export class TrendChartWidgetService {
    constructor(private api: NetworkSummeryWidgetApi, private trendsWidgetService: TrendsWidgetService) {}

    index(columns: string, filters: TrendChartFiltersType) {
        const queryParams: NetworkSummaryQueryParamsWidgetDto = {
            sortField: 'added_date',
            sortDirection: 'desc',
            perPage: 100,
            page: 1,
            preset: undefined
        };

        const payload: NetworkSummaryBodyWidgetDto = {
            breakdown: BreakdownEnum.Day,
            breakdowns: BreakdownEnum.Day,
            columns,
            filters
        };

        const breakdown = (preset: CustomDateRangeTitleEnum) =>
            preset === CustomDateRangeTitleEnum.Today ? BreakdownEnum.Hour : BreakdownEnum.Day;

        return this.trendsWidgetService.update$.pipe(
            switchMap((value) =>
                this.api.index(
                    { ...queryParams, ...value, preset: value.selectedRange },
                    {
                        ...payload,
                        breakdown: breakdown(value.selectedRange),
                        breakdowns: breakdown(value.selectedRange)
                    }
                )
            )
        );
    }

    diffDays(rangeFrom: string, rangeTo: string): number {
        return CustomDateRangeUtil.countDiffDate({
            rangeFrom: DateUtil.moment(rangeFrom),
            rangeTo: DateUtil.moment(rangeTo)
        });
    }
}
