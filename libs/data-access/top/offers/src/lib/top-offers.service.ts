import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { AbstractTopService, BaseTopModel } from '@scaleo/data-access/top/common';
import { DateStringModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

interface TopOfferWidgetModel extends BaseTopModel {
    offer: string;
}

interface TopOfferFilters extends BaseObjectModel {
    advertisers: string;
}

@Injectable()
export class TopOffersService extends AbstractTopService {
    breakdown = 'offer';
    breakdowns = 'offer';
    columns = 'clicks,cv_total,total_revenue';
    sortField = 'total_revenue';

    private _filters$: BehaviorSubject<TopOfferFilters> = new BehaviorSubject<TopOfferFilters>(undefined);

    constructor(private readonly rest: RestApiService, protected readonly customDateRangeService: CustomDateRangeService) {
        super(customDateRangeService);
    }

    index(): Observable<TopOfferWidgetModel[]> {
        return combineLatest([this.prepareParams$, this._filters$]).pipe(
            switchMap(([params, filters]) =>
                this.rest.post<ApiResponse<TopOfferWidgetModel[]>>(
                    'dashboard-statistics-top-offers',
                    {
                        ...params?.payload,
                        filters: filters
                    },
                    {
                        request: { params: params?.queryParams }
                    }
                )
            ),
            map((response) => {
                const { info: { rows: rows = [] } = {} } = response || {};
                return rows;
            })
        );
    }

    setFilters(filters: TopOfferFilters) {
        this._filters$.next(filters);
    }

    setDateRange(newDate: DateStringModel) {
        super.setDateRange(newDate);
    }
}
