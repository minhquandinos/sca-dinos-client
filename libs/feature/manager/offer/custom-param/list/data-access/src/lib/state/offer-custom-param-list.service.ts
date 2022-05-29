import { Injectable } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { OfferCustomParamListApi } from '@scaleo/feature/manager/offer/custom-param/list/api';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { baseMatchStatus, BaseStatusNameEnum } from '@scaleo/platform/list/access-data';
import { objectUtil } from '@scaleo/utils';

import { OfferCustomParamListQuery } from './offer-custom-param-list.query';
import { OfferCustomParamListStore, OfferCustomParamsState } from './offer-custom-param-list.store';

@Injectable()
export class OfferCustomParamListService extends BaseEntityService<OfferCustomParamsState> {
    constructor(
        private readonly api: OfferCustomParamListApi,
        protected readonly store: OfferCustomParamListStore,
        protected readonly query: OfferCustomParamListQuery,
        private readonly jsonConvertService: JsonConvertService,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {
        super(store, query);
    }

    index() {
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
            map(({ results }) => this.jsonConvertService.mapper(OfferCustomParamListModel, results)),
            tap((results) => {
                this.store.set(results);
            })
        );
    }

    add(data: OfferCustomParamListModel) {
        if (!this.getFilterStatus || this.getFilterStatus === baseMatchStatus(data.status)) {
            this.store.add(data);
            this.reload();
        }
    }

    update(data: OfferCustomParamListModel) {
        const { id, status } = data;

        if (!this.getFilterStatus || this.getFilterStatus === baseMatchStatus(status)) {
            this.store.update(id, data);
        } else {
            this.remove(id);
        }
        this.reload();
    }

    remove(id: number) {
        this.store.remove(id);
        this.reload();
    }

    private get getFilterStatus(): BaseStatusNameEnum {
        return this.getParamsValue('status') as BaseStatusNameEnum;
    }
}
