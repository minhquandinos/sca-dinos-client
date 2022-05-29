import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BreakdownEnum, isTimeBreakdown } from '@scaleo/reports/statistic/common';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsQuery } from './new-report-statistics.query';
import { NewReportStatisticsService } from './new-report-statistics.service';

@Injectable()
export class NewReportStatisticsSortService {
    private _sortField$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    sortField$ = this._sortField$.asObservable();

    constructor(private query: NewReportStatisticsQuery, private statisticsService: NewReportStatisticsService) {}

    initSortField(path: BreakdownEnum): void {
        let sortField = '';
        if (isTimeBreakdown(path)) {
            sortField = this.query.filterBreakdown || path;
        } else {
            sortField = this.isChainColumnsForSort();
        }

        const newSortField: UiTable2SortColumnModel = {
            direction: 'desc',
            field: sortField
        };

        this.statisticsService.updateSort(newSortField);
        this._sortField$.next(sortField);
    }

    private isChainColumnsForSort(): string {
        const fields = ['approved_revenue', 'approved_profit', 'cv_approved', 'clicks', 'unique_clicks'];
        const columnsArr: string[] = this.query.filterColumns.split(',');

        let sort;
        fields.some((field) => {
            const includesField = columnsArr.includes(field);
            if (includesField) {
                sort = field;
            }
            return includesField;
        });
        return sort || (columnsArr && columnsArr.length > 0 ? columnsArr[0] : '');
    }
}
