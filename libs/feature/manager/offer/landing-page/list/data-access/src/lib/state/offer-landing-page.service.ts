import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferLandingPageApi } from '@scaleo/feature/manager/offer/landing-page/list/api';
import { offerLandingPageMatchStatus } from '@scaleo/platform/list/access-data';
import { objectUtil } from '@scaleo/utils';

import { OfferLandingPageModel } from '../models';
import { OfferLandingPageQuery } from './offer-landing-page.query';
import { OfferLandingPageState, OfferLandingPageStore } from './offer-landing-page.store';

@Injectable()
export class OfferLandingPageService extends BaseEntityService<OfferLandingPageState> {
    constructor(
        private readonly api: OfferLandingPageApi,
        protected readonly store: OfferLandingPageStore,
        protected readonly query: OfferLandingPageQuery,
        private readonly jsonConvertService: JsonConvertService,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {
        super(store, query);
    }

    index(): Observable<OfferLandingPageModel[]> {
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
            map(({ results }) => this.jsonConvertService.mapper(OfferLandingPageModel, results)),
            tap((results) => {
                this.store.set(results);
            })
        );
    }

    setSearch(search: string): void {
        this.updateParamsValue({ search, page: 1 });
    }

    add(data: OfferLandingPageModel): void {
        const filterStatus = this.getParamsValue('status');
        if (!filterStatus || filterStatus === offerLandingPageMatchStatus(data.status)) {
            this.store.add(data);
            this.reload();
        }
    }

    update(id: number, data: OfferLandingPageModel): void {
        const filterStatus = this.getParamsValue('status');
        if (!filterStatus || filterStatus === offerLandingPageMatchStatus(data.status)) {
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
}
