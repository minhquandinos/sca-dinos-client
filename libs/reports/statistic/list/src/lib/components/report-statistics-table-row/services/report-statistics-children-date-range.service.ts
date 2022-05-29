import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';

@Injectable()
export class ReportStatisticsChildrenDateRangeService {
    private _parentDateRange$: BehaviorSubject<CustomDateRangeModel> = new BehaviorSubject<CustomDateRangeModel>(null);

    readonly parentDateRange$ = this._parentDateRange$.asObservable();

    constructor() {}

    setParentPayloadDate(dates: CustomDateRangeModel): void {
        if (dates) {
            this._parentDateRange$.next({
                ...dates
            });
        }
    }

    get parentDateRange(): CustomDateRangeModel {
        return this._parentDateRange$.value;
    }
}
