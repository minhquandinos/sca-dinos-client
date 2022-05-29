import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { BehaviorSubject, defer, Observable, of, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { DateUtil } from '@scaleo/platform/date/util';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { OfferTrafficDistributionApi } from '../api/offer-traffic-distribution.api';
import { OfferTrafficDistributionABTestingModel } from '../models';
import { OfferTrafficDistributionQuery } from './offer-traffic-distribution.query';
import { OfferTrafficDistributionStore } from './offer-traffic-distribution.store';

@Injectable()
export class OfferTrafficDistributionAbTestingService {
    private readonly _reload$ = new Subject<void>();

    private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly loading$ = this._loading$.asObservable();

    constructor(
        private readonly api: OfferTrafficDistributionApi,
        private readonly store: OfferTrafficDistributionStore,
        private readonly query: OfferTrafficDistributionQuery,
        private readonly toastr: ToastrBarService,
        private readonly jsonConvertService: JsonConvertService
    ) {}

    index(offerId: number): Observable<OfferTrafficDistributionABTestingModel[]> {
        return this._reload$.pipe(
            tap(() => {
                this._loading$.next(false);
            }),
            startWith(''),
            switchMap(() => this.query.select('queryParams')),
            filter((queryParams) => !!queryParams),
            switchMap((queryParams) => this.api.index(offerId, queryParams)),
            this.mapperDtoToModel(),
            tap((items) => {
                this.store.update({
                    items
                });
            }),
            map((items) => items),
            tap(() => {
                this._loading$.next(true);
            })
        );
    }

    create(offerId: number, tempId: string, landingId: number, distribution: number): Observable<OfferTrafficDistributionABTestingModel> {
        return this.api.create(offerId, { link_id: landingId, distribution }).pipe(
            this.mapperDtoToModel(),
            tap((elem) => {
                this.store.update((state) => ({
                    ...state,
                    items: ArrayUtil.updateByKey(state.items, 'id', tempId, elem)
                }));
                this.toastr.successResponse('offers_page.traffic_distribution.updated');
            }),
            map((elem) => elem as OfferTrafficDistributionABTestingModel),
            this.baseException()
        );
    }

    update(offerId: number, id: number, distribution: number): Observable<OfferTrafficDistributionABTestingModel> {
        return this.api.update(offerId, id, { distribution }).pipe(
            this.mapperDtoToModel(),
            tap((elem) => {
                this.store.update((state) => ({
                    ...state,
                    items: ArrayUtil.updateByKey(state.items, 'id', id, elem)
                }));
                this.toastr.successResponse('offers_page.traffic_distribution.updated');
            }),
            map((elem) => elem as OfferTrafficDistributionABTestingModel),
            this.baseException()
        );
    }

    addItem(): void {
        this.store.update((state) => ({
            ...state,
            items: [...state.items, OfferTrafficDistributionAbTestingService.initialItem]
        }));
    }

    setDistribution(value: number): void {
        this.store.update({ distribution: value });
    }

    delete(offerId: number, id: number | string): any {
        const tempRemove = of(id);

        const apiRemove = this.api.delete(offerId, id as number);

        return defer(() => (typeof id === 'number' ? apiRemove : tempRemove)).pipe(
            tap(() => {
                this.removeFromState(id);
                this.toastr.successResponse('offers_page.traffic_distribution.updated');
            }),
            this.baseException()
        );
    }

    reload(): void {
        this._reload$.next();
    }

    private removeFromState(id: number | string): void {
        this.store.update((state) => ({
            ...state,
            items: state.items.filter((elem) => elem.id !== id)
        }));
    }

    private static get initialItem(): OfferTrafficDistributionABTestingModel {
        return {
            id: guid(),
            landing: null,
            distribution: 0,
            added_date: DateUtil.now(),
            clicks: 0,
            conversions: 0,
            cr: 0
        };
    }

    private baseException(): OperatorFunction<any, any> {
        return catchError((error) => {
            this.toastr.exception();
            return throwError(error);
        });
    }

    private mapperDtoToModel(): OperatorFunction<any, any> {
        return map((response) => this.jsonConvertService.mapper(OfferTrafficDistributionABTestingModel as any, response));
    }
}
