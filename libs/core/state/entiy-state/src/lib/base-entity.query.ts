import { QueryEntity } from '@datorama/akita';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseEntityState } from './base-entity.model';

export class BaseEntityQuery<T extends BaseEntityState<T>> extends QueryEntity<T> {
    private _reloading$: Subject<void> = new Subject<void>();

    readonly reloading$ = this._reloading$.asObservable();

    readonly totalCount$ = this.selectAll().pipe(map((total) => total.length));

    readonly notFound$ = this.totalCount$.pipe(map((total) => total <= 0));

    readonly loading$ = this.selectLoading();

    readonly isLoad$ = this.loading$.pipe(map((loading) => !loading));

    constructor(protected store: any) {
        super(store);
    }

    getData(): Partial<T> {
        return this.getValue().data;
    }

    getParams(): T['params'] {
        return this.getValue().params;
    }

    getPayload(): T['payload'] {
        return this.getValue().payload;
    }

    selectData$(): Observable<Partial<T>> {
        return this.select((state) => state.data);
    }

    selectParams$(): Observable<T['params']> {
        return this.select((state) => state.params);
    }

    selectPayload$(): Observable<T['payload']> {
        return this.select((state) => state.payload);
    }

    getDataValue<K extends keyof T['data']>(key: K): T['data'][K] {
        return this.getValue().data[key];
    }

    getParamsValue<K extends keyof T['params']>(key: K): T['params'][K] {
        return this.getValue().params[key as string];
    }

    getPayloadValue<K extends keyof T['payload']>(key: K): T['payload'][K] {
        return this.getValue().payload[key as string];
    }

    selectDataValue$<K extends keyof T['data']>(key: K): Observable<T['data'][K]> {
        return this.select((state) => state.data[key]);
    }

    selectParamsValue$<K extends keyof T['params']>(key: K): Observable<T['params'][K]> {
        return this.select((state) => state.params[key as string]);
    }

    selectPayloadValue$<K extends keyof T['payload']>(key: K): Observable<T['payload'][K]> {
        return this.select((state) => state.payload[key as string]);
    }

    reloading() {
        this._reloading$.next();
    }
}
