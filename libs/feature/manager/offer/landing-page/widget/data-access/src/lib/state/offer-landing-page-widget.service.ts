import { Injectable } from '@angular/core';
import { combineLatest, shareReplay } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferLandingPageApi } from '@scaleo/feature/manager/offer/landing-page/list/api';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';

import { OfferLandingPageWidgetQuery } from './offer-landing-page-widget.query';
import { OfferLandingPageWidgetState, OfferLandingPageWidgetStore } from './offer-landing-page-widget.store';

@Injectable()
export class OfferLandingPageWidgetService extends BaseEntityService<OfferLandingPageWidgetState> {
    constructor(
        protected store: OfferLandingPageWidgetStore,
        protected query: OfferLandingPageWidgetQuery,
        private readonly _api: OfferLandingPageApi,
        private readonly _jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(offerId: number) {
        const observable = combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            switchMap(([queryParams]) => this._api.index(offerId, queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            map(({ results }) => this._jsonConvertService.mapper(OfferLandingPageModel, results)),
            tap((results) => {
                this.store.set(results);
            }),
            shareReplay()
        );

        return this.observable(observable);
    }
}
