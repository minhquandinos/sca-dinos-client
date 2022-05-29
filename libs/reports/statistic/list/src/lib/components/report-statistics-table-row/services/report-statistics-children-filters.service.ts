import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { NewReportStatisticsQuery } from '../../../state';

@Injectable()
export class ReportStatisticsChildrenFiltersService {
    private _parentFilters$: BehaviorSubject<RequestPayloadFilter2Interface> = new BehaviorSubject<RequestPayloadFilter2Interface>(
        this.statisticsQuery.filterData
    );

    readonly parentFilters$ = this._parentFilters$.asObservable();

    constructor(private statisticsQuery: NewReportStatisticsQuery) {}

    setParentPayloadFilters(filters: RequestPayloadFilter2Interface): void {
        if (filters) {
            this._parentFilters$.next({
                // ...this.parentFilters,
                ...filters
            });
        }
    }

    get parentFilters(): RequestPayloadFilter2Interface {
        return this._parentFilters$.value;
    }
}
