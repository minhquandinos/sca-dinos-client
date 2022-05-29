import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StatisticModel } from '@scaleo/reports/common';
import { BreakdownEnum, ReportStatisticsBreakdownFieldMap } from '@scaleo/reports/statistic/common';

import { ReportStatisticsChildrenCurrentFieldService } from './report-statistics-children-current-field.service';

@Injectable()
export class ReportStatisticsChildrenBreakdownService {
    private _breakdown$?: BehaviorSubject<BreakdownEnum> = new BehaviorSubject<BreakdownEnum>(null);

    breakdown$ = this._breakdown$.asObservable();

    parentBreakdown: BreakdownEnum;

    constructor(private childrenCurrentFieldService: ReportStatisticsChildrenCurrentFieldService) {}

    setBreakdown(currentBreakdown: BreakdownEnum, nextBreakdown: BreakdownEnum, item: StatisticModel) {
        this._breakdown$.next(nextBreakdown);
        this.setParentBreakdown(currentBreakdown).setParentBreakdownField(item);
    }

    get breakdown(): BreakdownEnum {
        return this._breakdown$.value;
    }

    private setParentBreakdown(breakdown: BreakdownEnum): ReportStatisticsChildrenBreakdownService {
        this.parentBreakdown = breakdown;
        return this;
    }

    private setParentBreakdownField(item: StatisticModel) {
        const itemField = item[ReportStatisticsBreakdownFieldMap.breakdownField(this.parentBreakdown)];
        if (item) {
            this.childrenCurrentFieldService.setCurrentField(itemField);
        }
    }
}
