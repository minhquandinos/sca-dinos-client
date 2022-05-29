import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StatisticRowType } from '@scaleo/reports/common';

@Injectable()
export class ReportStatisticsChildrenCurrentFieldService {
    private _currentField$: BehaviorSubject<StatisticRowType> = new BehaviorSubject(null);

    setCurrentField(item: StatisticRowType) {
        this._currentField$.next(item);
    }

    get currentField(): StatisticRowType {
        return this._currentField$.value;
    }
}
