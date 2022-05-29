import { Injectable } from '@angular/core';
import { guid, Query, Store } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { createBaseInitialState } from '@scaleo/core/state/state';

import { MultiSelectStoreItemModel } from '../models/multi-select-store-item.model';
import { MultiSelectBlockQueryParamsType } from '../types/multi-select-block.type';

export interface MultiSelectBlockState extends MultiSelectStoreItemModel {
    fetchData: boolean;
    queryParams: MultiSelectBlockQueryParamsType;
    isSearch: boolean;
    searching: boolean;
    exclude: unknown[];
}

const initialState = createBaseInitialState<MultiSelectBlockState>({
    items: [],
    pagination: undefined,
    selected: [],
    tempSelected: [],
    exclude: [],
    fetchData: true,
    isSearch: false,
    searching: false,
    queryParams: {}
});

@Injectable()
export class MultiSelectBlock2Store extends Store<MultiSelectBlockState> {
    constructor() {
        super(initialState, { name: `MultiSelectBlock-${guid()}` });
    }
}

@Injectable()
export class MultiSelectBlock2Query extends Query<MultiSelectBlockState> {
    constructor(protected store: MultiSelectBlock2Store) {
        super(store);
    }

    get notFound$(): Observable<boolean> {
        return combineLatest([this.select('items'), this.selectLoading()]).pipe(
            map(([items, loading]) => items.length <= 0 && !loading),
            share()
        );
    }
}
