import { Injectable } from '@angular/core';
import { combineLatest, shareReplay, startWith } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferGoalListApi } from '@scaleo/feature/manager/offer/goal/list/api';
import { OfferGoalListModel } from '@scaleo/feature/manager/offer/goal/list/data-access';

import { OfferGoalsWidgetQuery } from './offer-goals-widget.query';
import { OfferGoalsWidgetState, OfferGoalsWidgetStore } from './offer-goals-widget.store';

@Injectable()
export class OfferGoalsWidgetService extends BaseEntityService<OfferGoalsWidgetState> {
    constructor(
        protected store: OfferGoalsWidgetStore,
        protected query: OfferGoalsWidgetQuery,
        private _api: OfferGoalListApi,
        private _jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(id: number) {
        const observable = combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            switchMap(([queryParams]) => this._api.index(id, queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            map(({ results }) => {
                const items = this._jsonConvertService.mapper(OfferGoalListModel, results);
                this.store.set(items);
                return items;
            }),
            shareReplay()
        );

        return this.observable(observable);
    }
}
