import { Injectable } from '@angular/core';
import { combineLatest, Observable, shareReplay } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { OfferCustomParamListApi } from '@scaleo/feature/manager/offer/custom-param/list/api';

import { OfferCustomParamsWidgetQuery } from './offer-custom-params-widget.query';
import { OfferCustomParamsWidgetState, OfferCustomParamsWidgetStore } from './offer-custom-params-widget.store';

@Injectable()
export class OfferCustomParamsWidgetService extends BaseEntityService<OfferCustomParamsWidgetState> {
    constructor(
        protected readonly store: OfferCustomParamsWidgetStore,
        protected readonly query: OfferCustomParamsWidgetQuery,
        private readonly _api: OfferCustomParamListApi,
        private readonly _jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(offerId: number): Observable<OfferCustomParamListModel[]> {
        const observable = combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            switchMap(([queryParams]) => this._api.index(offerId, queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({
                    pagination
                });
            }),
            map(({ results }) => this._jsonConvertService.mapper(OfferCustomParamListModel, results)),
            tap((results) => {
                this.store.set(results);
            }),
            shareReplay()
        );

        return this.observable(observable);
    }

    resetStore(): void {
        this.store.reset();
    }

    // remove(id: number): void {
    //     this.store.update({
    //         ...this.query.getValue(),
    //         items: this.query.getValue().items.filter((param) => param.id !== id),
    //         total: this.query.getTotal - 1
    //     });
    // }
    //
    // update(id: number, newParam: OfferCustomParamListModel): void {
    //     this.store.update({
    //         ...this.query.getValue(),
    //         items: this.query.getValue().items.map((param) => (param.id === id ? newParam : param))
    //     });
    // }
    //
    // create(param: OfferCustomParamListModel): void {
    //     this.store.update({
    //         items: [param, ...this.query.getValue().items],
    //         total: this.query.getTotal + 1
    //     });
    // }

    // pageWasChanged(page: number): void {
    //     this.store.update({ params: { ...this.query.getValue().params, page } });
    // }
}
