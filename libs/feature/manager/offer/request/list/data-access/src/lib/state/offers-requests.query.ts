import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferRequestFilterType } from '../offer-request-filter.type';
import { OfferRequestState, OffersRequestsStore } from './offers-requests.store';

@Injectable()
export class OffersRequestsQuery extends BaseEntityQuery<OfferRequestState> {
    readonly defaultSortField$ = this.selectParamsValue$('sortField');

    readonly defaultSortDirection$ = this.selectParamsValue$('sortDirection');

    readonly pagination$ = this.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly showPagination$ = this.pagination$.pipe(
        filter((pagination) => !!pagination),
        map(({ total_count }) => total_count > 10)
    );

    readonly selectedAnyOutputFilter$: Observable<boolean> = combineLatest([
        this.selectParamsValue$('statuses'),
        this.selectParamsValue$('offers'),
        this.selectParamsValue$('affiliates')
    ]).pipe(map(([statuses, offers, affiliates]) => !!(statuses.length || offers.length || affiliates.length)));

    constructor(protected store: OffersRequestsStore) {
        super(store);
    }

    selectFilterCount(param: OfferRequestFilterType): Observable<number> {
        return this.selectParamsValue$(param).pipe(map((values) => values?.length));
    }
}
