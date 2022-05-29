import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, Observable, pluck, switchMap } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { DateStringModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { TopWidgetModel } from '@scaleo/shared/widgets/common/top-widget';

@Injectable()
export class TopOffersWidgetService {
    private readonly defaultQueryParams: BaseObjectModel = {
        page: 1,
        perPage: 10,
        sortField: 'total_revenue',
        sortDirection: 'desc'
    };

    private readonly defaultPayloadParams: BaseObjectModel = {
        breakdown: 'offer',
        breakdowns: 'offer',
        columns: 'clicks,cv_total,total_revenue'
    };

    private _dateRangePayloadParams$: BehaviorSubject<DateStringModel> = new BehaviorSubject<DateStringModel>({
        rangeFrom: this.customDateRangeService.rangeFrom,
        rangeTo: this.customDateRangeService.rangeTo
    });

    private _advertiserFilterParams$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

    constructor(private readonly rest: RestApiService, private readonly customDateRangeService: CustomDateRangeService) {}

    index(): Observable<TopWidgetModel[]> {
        const params = RequestUtil.queryParams(this.defaultQueryParams);

        return combineLatest([this._dateRangePayloadParams$, this._advertiserFilterParams$]).pipe(
            filter(([, advertiserId]) => !!advertiserId),
            switchMap(([dateRange, advertiserId]) =>
                this.rest.post<ApiResponse<TopWidgetModel[]>>(
                    'dashboard-statistics-top-offers',
                    {
                        ...this.defaultPayloadParams,
                        ...dateRange,
                        filters: {
                            advertisers: advertiserId.toString()
                        }
                    },
                    {
                        request: { params }
                    }
                )
            ),
            pluck('info', 'rows', 'rows')
        );
    }

    setDateRange(newDate: DateStringModel) {
        this._dateRangePayloadParams$.next(newDate);
    }

    setAdvertiserId(id: number) {
        this._advertiserFilterParams$.next(id);
    }
}
