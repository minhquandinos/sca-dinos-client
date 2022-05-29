import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';

import { ReportsState, ReportsStore } from './reports.store';

@Injectable({ providedIn: 'root' })
export class ReportsQuery extends Query<ReportsState> {
    constructor(protected store: ReportsStore) {
        super(store);
    }

    get date$(): Observable<CustomDateRangeModel> {
        return this.select((state) => state.date);
    }

    getTempFilters(page: string): ReportFilterModel[] {
        return this.getValue().tempFilters[page];
    }

    getTempFilters$(page: string): Observable<ReportFilterModel[]> {
        return this.select((state) => state.tempFilters[page]);
    }
}
