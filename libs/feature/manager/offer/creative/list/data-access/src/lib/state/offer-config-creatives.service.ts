import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ManagerOfferCreativeDto, OfferCreativeListApi } from '@scaleo/feature/manager/offer/creative/list/api';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { baseMatchStatus, BaseStatusNameEnum } from '@scaleo/platform/list/access-data';
import { objectUtil } from '@scaleo/utils';

import { ManagerOfferCreativeModel } from '../models/offer-creatives.model';
import { OfferConfigCreativesQuery } from './offer-config-creatives.query';
import { OfferConfigCreativesState, OfferConfigCreativesStore } from './offer-config-creatives.store';

@Injectable()
export class OfferConfigCreativesService extends BaseEntityService<OfferConfigCreativesState> {
    constructor(
        protected readonly store: OfferConfigCreativesStore,
        private readonly api: OfferCreativeListApi,
        protected readonly query: OfferConfigCreativesQuery,
        private readonly jsonConvertService: JsonConvertService,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {
        super(store, query);
    }

    index(): Observable<ManagerOfferCreativeModel[]> {
        return this.query.reloading$.pipe(
            startWith(''),
            switchMap(() => objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1)),
            switchMap((params) => this.api.index(this.offerDetailQuery.id, params)),
            tap(({ pagination }) => {
                this.store.update({
                    data: {
                        pagination
                    }
                });
            }),
            pluck('results'),
            map((data: ManagerOfferCreativeDto[]) => this.jsonConvertService.mapper(ManagerOfferCreativeModel, data)),
            tap((results) => {
                this.store.set(results);
            })
        );
    }

    setSearch(search: string): void {
        this.updateParamsValue({ search, page: 1 });
    }

    add(data: ManagerOfferCreativeModel): void {
        if (!this.getFilterStatus || this.getFilterStatus === baseMatchStatus(data.status)) {
            this.store.add(data);
            this.reload();
        }
    }

    update(data: ManagerOfferCreativeModel): void {
        const { id, status } = data;

        if (!this.getFilterStatus || this.getFilterStatus === baseMatchStatus(status)) {
            this.store.update(id, data);
        } else {
            this.remove(id);
        }
        this.reload();
    }

    remove(id: number): void {
        this.store.remove(id);
        this.reload();
    }

    private get getFilterStatus(): BaseStatusNameEnum {
        return this.getParamsValue('status') as BaseStatusNameEnum;
    }
}
