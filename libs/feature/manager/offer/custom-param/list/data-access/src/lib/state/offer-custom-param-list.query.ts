import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferCustomParamListStore, OfferCustomParamsState } from './offer-custom-param-list.store';

@Injectable()
export class OfferCustomParamListQuery extends BaseEntityQuery<OfferCustomParamsState> {
    readonly totalCount$: Observable<number>;

    readonly pagination$ = this.getPagination$;

    constructor(protected readonly store: OfferCustomParamListStore) {
        super(store);
        this.totalCount$ = this.getTotalCount$;
    }

    private get getTotalCount$(): Observable<number> {
        return this.pagination$.pipe(pluck('total_count'));
    }

    private get getPagination$(): Observable<ApiPaginationModel> {
        return this.selectDataValue$('pagination');
    }
}
