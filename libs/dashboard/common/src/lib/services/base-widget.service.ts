import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, of } from 'rxjs';

import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';

export abstract class BaseWidgetService {
    protected currentDateRange$: Observable<CustomDateRangeModel> = this.dashboardToolbarService.dateRange$.asObservable();

    protected constructor(protected dashboardToolbarService: DashboardToolbarService) {}

    protected setCurrentPeriod(translateService: TranslateService, formatService: FormatService): Observable<string> {
        return DateUtil.periodLabel(this.currentDateRange$, translateService, formatService);
    }

    protected setPreviousPeriod(date: CustomDateRangeModel): Observable<string> {
        if (date) {
            if (date.rangeFrom === date.rangeTo) {
                return of(date.rangeFrom);
            }

            return of(`${date.rangeFrom} - ${date.rangeTo}`);
        }

        return EMPTY;
    }
}
