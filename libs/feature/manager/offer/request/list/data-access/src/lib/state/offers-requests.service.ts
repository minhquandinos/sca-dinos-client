import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityCollectionService } from '@scaleo/core/state/entiy-state';
import type { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import { OfferRequestColumnSortEnum } from '../../../../component/src/lib/types/offer-request-columns.enum';
import { OffersRequestsApi } from '../api/offers-requests.api';
import { OfferRequestModel, OfferRequestQueryParamsDto, OfferRequestQueryParamsModel } from '../models/offer-request.model';
import { OffersRequestsQuery } from './offers-requests.query';
import { OfferRequestState, OffersRequestsStore } from './offers-requests.store';

@Injectable()
export class OffersRequestsService extends BaseEntityCollectionService<OfferRequestState, OffersRequestsStore, OffersRequestsQuery> {
    constructor(
        protected store: OffersRequestsStore,
        protected query: OffersRequestsQuery,
        private readonly api: OffersRequestsApi,
        private readonly jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    private static prepareParams(params: OfferRequestQueryParamsModel): OfferRequestQueryParamsDto {
        const statuses = ArrayUtil.join(params.statuses);
        const offers = ArrayUtil.join(params.offers);
        const affiliates = ArrayUtil.join(params.affiliates);
        return {
            ...params,
            statuses,
            offers,
            affiliates
        };
    }

    index(): Observable<OfferRequestModel[]> {
        return combineLatest([
            this.query.reloading$.pipe(startWith(true)),
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1)
        ]).pipe(
            switchMap(([, params]) =>
                this.api.index(OffersRequestsService.prepareParams(params)).pipe(
                    tap(({ pagination }) => {
                        this.updateDataValue({ pagination });
                    }),
                    tap(({ results }) => {
                        const data = this.jsonConvertService.mapper(OfferRequestModel, results);
                        this.store.set(data);
                    }),
                    tap(() => {
                        if (!this.query.getValue().loading) {
                            this.store.setLoading(false);
                        }
                    }),
                    map(({ results }) => results)
                )
            )
        );
    }

    sort({ field, direction }: UiTable2SortColumnModel<OfferRequestColumnSortEnum>) {
        this.updateParamsValue({
            sortField: field,
            sortDirection: direction,
            page: 1
        });
    }
}
