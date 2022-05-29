import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TopAffiliatesApi } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/api';
import {
    TOP_AFFILIATES_REVENUE_FIELD,
    TopAffiliatesRequestDtoType,
    WidgetTopAffiliateRowsModel
} from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';

@Injectable()
export class TopAffiliatesService {
    private readonly _filters$ = new BehaviorSubject<TopAffiliatesRequestDtoType>({
        params: {
            sortField: TOP_AFFILIATES_REVENUE_FIELD,
            sortDirection: 'desc',
            perPage: 6,
            page: 1,
            rangeFrom: '',
            rangeTo: '',
            preset: ''
        },
        payload: {
            filters: undefined
        }
    });

    readonly filter$ = this._filters$.asObservable();

    constructor(private readonly api: TopAffiliatesApi) {}

    data$(date$: Observable<CustomDateRangeModel>, offerId?: number): Observable<WidgetTopAffiliateRowsModel[]> {
        return combineLatest([date$, this.filter$]).pipe(
            map(([date, requests]) => ({
                ...requests,
                params: {
                    ...requests.params,
                    rangeFrom: date.rangeFrom,
                    rangeTo: date.rangeTo,
                    preset: date.selectedRange
                },
                payload: {
                    ...requests.payload,
                    filters: {
                        offers: offerId?.toString()
                    }
                }
            })),
            switchMap((requests) => this.api.index(requests)),
            map((rows: WidgetTopAffiliateRowsModel[]) => rows || [])
        );
    }

    sorting(sort: UiTableSortInterface): void {
        const { params, payload } = this._filters$.value;
        this._filters$.next({
            params: {
                ...params,
                sortField: sort.field,
                sortDirection: sort.direction
            },
            payload
        });
    }
}
