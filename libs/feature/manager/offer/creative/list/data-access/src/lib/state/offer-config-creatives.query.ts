import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';
import { ArrayUtil } from '@scaleo/utils';

import { ManagerOfferCreativeModel } from '../models/offer-creatives.model';
import { OfferConfigCreativesState, OfferConfigCreativesStore } from './offer-config-creatives.store';

@Injectable()
export class OfferConfigCreativesQuery extends BaseEntityQuery<OfferConfigCreativesState> {
    readonly totalCount$: Observable<number>;

    readonly pagination$ = this.getPagination$;

    constructor(protected readonly store: OfferConfigCreativesStore) {
        super(store);
        this.totalCount$ = this.getTotalCount$;
    }

    get getItems$(): Observable<ManagerOfferCreativeModel[]> {
        return this.selectAll().pipe(map((items) => ArrayUtil.orderBy(items as ManagerOfferCreativeModel[], 'status')));
    }

    private get getTotalCount$(): Observable<number> {
        return this.selectDataValue$('pagination').pipe(pluck('total_count'));
    }

    private get getPagination$(): Observable<ApiPaginationModel> {
        return this.selectDataValue$('pagination');
    }
}
