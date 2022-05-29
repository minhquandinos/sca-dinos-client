import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, startWith } from 'rxjs';
import { delay, map, pluck, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { allOfferColumnsForExport, OffersExportParamsModel } from '@scaleo/offer/common';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import { AffiliateOfferListApi } from '../api/affiliate-offer-list.api';
import {
    AffiliateOfferListModel,
    AffiliateOfferListQueryParamsDto,
    AffiliateOfferListQueryParamsModel
} from '../models/affiliate-offer-list.model';
import { AffiliateOfferListQuery } from './affiliate-offer-list.query';
import { AffiliateOfferListState, AffiliateOfferListStore } from './affiliate-offer-list.store';

@Injectable()
export class AffiliateOfferListService extends BaseEntityService<AffiliateOfferListState> {
    constructor(
        private jsonConvertService: JsonConvertService,
        protected store: AffiliateOfferListStore,
        protected query: AffiliateOfferListQuery,
        private readonly api: AffiliateOfferListApi,
        private readonly translate: TranslateService
    ) {
        super(store, query);
    }

    private static transformParamsToOfferQueryParams(params: AffiliateOfferListQueryParamsModel): AffiliateOfferListQueryParamsDto {
        const { tags, countries, goalsTypes, status } = params;
        return {
            ...params,
            tags: ArrayUtil.join(tags),
            countries: ArrayUtil.join(countries),
            goalsTypes: ArrayUtil.join(goalsTypes),
            status: typeof status === 'string' && status !== 'status' ? status : ''
        };
    }

    public list(): Observable<AffiliateOfferListModel[]> {
        return combineLatest([
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1),
            this.query.reloading$.pipe(startWith(''))
        ]).pipe(
            delay(200),
            tap((): any => this.store.setLoading(true)),
            map(([params]) => AffiliateOfferListService.transformParamsToOfferQueryParams(params)),
            switchMap((filters) => this.api.index(filters)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            tap((offers: AffiliateOfferListModel[]) => {
                this.store.set(offers);
                this.store.setLoading(false);
            })
        );
    }

    export(format: SheetExtensionType): Observable<HttpResponse<ArrayBuffer>> {
        const params = AffiliateOfferListService.transformParamsToOfferQueryParams(this.query.getParams());
        const filters: OffersExportParamsModel = {
            ...params,
            format,
            lang: this.translate.currentLang,
            columns: allOfferColumnsForExport
        };
        return this.api.export(filters);
    }
}
