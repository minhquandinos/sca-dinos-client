import { Injectable } from '@angular/core';
import { combineLatest, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferCreativeListApi } from '@scaleo/feature/manager/offer/creative/list/api';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';

import { OfferCreativesWidgetQuery } from './offer-creatives-widget.query';
import { OfferCreativesWidgetState, OfferCreativesWidgetStore } from './offer-creatives-widget.store';

@Injectable()
export class OfferCreativesWidgetService extends BaseEntityService<OfferCreativesWidgetState> {
    constructor(
        protected readonly store: OfferCreativesWidgetStore,
        protected readonly query: OfferCreativesWidgetQuery,
        private readonly _api: OfferCreativeListApi,
        private readonly _jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(offerId: number): Observable<ManagerOfferCreativeModel[]> {
        const observable = combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            switchMap(([queryParams]) => this._api.index(offerId, queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            map(({ results }) => {
                const items = this._jsonConvertService.mapper(ManagerOfferCreativeModel, results);
                this.store.set(items);
                return items;
            }),
            shareReplay()
        );

        return this.observable(observable);
    }

    // downloadXML(id: number): Promise<HttpResponse<ArrayBuffer>> {
    //     return this.api.downloadXML(id).toPromise();
    // }

    resetStore(): void {
        this.store.reset();
    }
}
