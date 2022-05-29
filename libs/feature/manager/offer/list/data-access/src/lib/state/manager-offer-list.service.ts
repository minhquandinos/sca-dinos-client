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

import { ManagerOfferListApi } from '../api/manager-offer-list.api';
import {
    ManagerOfferListModel,
    ManagerOfferListQueryParamsDto,
    ManagerOfferListQueryParamsModel
} from '../models/manager-offer-list.model';
import { ManagerOfferListQuery } from './manager-offer-list.query';
import { ManagerOfferListState, ManagerOfferListStore } from './manager-offer-list.store';

@Injectable()
export class ManagerOfferListService extends BaseEntityService<ManagerOfferListState> {
    constructor(
        private jsonConvertService: JsonConvertService,
        protected store: ManagerOfferListStore,
        protected query: ManagerOfferListQuery,
        private readonly api: ManagerOfferListApi,
        private readonly translate: TranslateService
    ) {
        super(store, query);
    }

    private static transformParamsToOfferQueryParams(params: ManagerOfferListQueryParamsModel): ManagerOfferListQueryParamsDto {
        const { advertisers, tags, countries, goalsTypes, visible_type, status } = params;
        return {
            ...params,
            visible_type: ArrayUtil.join(visible_type),
            advertisers: ArrayUtil.join(advertisers),
            tags: ArrayUtil.join(tags),
            countries: ArrayUtil.join(countries),
            goalsTypes: ArrayUtil.join(goalsTypes),
            status: typeof status === 'string' && status !== 'status' ? status : ''
        };
    }

    public list(): Observable<ManagerOfferListModel[]> {
        const observable = combineLatest([
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1),
            this.query.reloading$.pipe(startWith(''))
        ]).pipe(
            delay(200),
            map(([params]) => ManagerOfferListService.transformParamsToOfferQueryParams(params)),
            switchMap((filters) => this.api.index(filters)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            tap((offers: ManagerOfferListModel[]) => {
                this.store.set(offers);
            })
        );

        return this.observable(observable);
    }

    export(format: SheetExtensionType): Observable<HttpResponse<ArrayBuffer>> {
        const params = ManagerOfferListService.transformParamsToOfferQueryParams(this.query.getParams());
        const filters: OffersExportParamsModel = {
            ...params,
            format,
            lang: this.translate.currentLang,
            columns: allOfferColumnsForExport
        };
        return this.api.export(filters);
    }
}
