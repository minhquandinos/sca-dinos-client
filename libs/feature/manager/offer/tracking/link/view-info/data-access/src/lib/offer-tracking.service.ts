import { Injectable } from '@angular/core';
import { map, Observable, share } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ManagerOfferCreativeListQueryParamsDto, OfferCreativeListApi } from '@scaleo/feature/manager/offer/creative/list/api';
import { OfferTrackingInterface } from '@scaleo/offer/common';

import { OfferTrackingApi } from './offer-tracking.api';

@Injectable()
export class OfferTrackingService {
    constructor(private readonly _api: OfferTrackingApi, private readonly _offerCreativeListApi: OfferCreativeListApi) {}

    view(offerId: number): Observable<OfferTrackingInterface> {
        return this._api.view(offerId);
    }

    creatives(offerId: number, params?: ManagerOfferCreativeListQueryParamsDto): Observable<BaseObjectModel[]> {
        const queryParams: ManagerOfferCreativeListQueryParamsDto = {
            perPage: 10,
            page: 1,
            sortDirection: 'desc',
            sortField: 'status',
            ...params
        };
        return this._offerCreativeListApi.index(offerId, queryParams).pipe(
            pluck('results'),
            map((items) =>
                items.map((item: any) => {
                    const { id, title } = item;
                    return { id, title };
                })
            ),
            share()
        );
    }
}
