import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { RequestUtil } from '@scaleo/core/rest-api/service';
import { DateStringModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

export abstract class AbstractTopService {
    protected page = 1;
    protected perPage = 10;
    protected sortField = 'id';
    protected sortDirection = 'desc';

    abstract breakdown: string;
    abstract breakdowns: string;
    abstract columns: string;

    private _dateRangePayloadParams$: BehaviorSubject<DateStringModel> = new BehaviorSubject<DateStringModel>({
        rangeFrom: this.customDateRangeService.rangeFrom,
        rangeTo: this.customDateRangeService.rangeTo
    });

    protected constructor(protected readonly customDateRangeService: CustomDateRangeService) {}

    protected get prepareParams$(): Observable<{ queryParams: HttpParams; payload: BaseObjectModel }> {
        return this._dateRangePayloadParams$.pipe(
            map((dateRange) => {
                const queryParams = RequestUtil.queryParams({
                    page: this.page,
                    perPage: this.perPage,
                    sortField: this.sortField,
                    sortDirection: this.sortDirection,
                    ...dateRange
                });
                return {
                    queryParams,
                    payload: {
                        breakdown: this.breakdown,
                        breakdowns: this.breakdowns,
                        columns: this.columns
                    }
                };
            })
        );
    }

    protected setDateRange(newDate: DateStringModel) {
        this._dateRangePayloadParams$.next(newDate);
    }
}
