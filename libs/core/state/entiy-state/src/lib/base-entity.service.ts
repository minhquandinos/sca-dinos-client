import { Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { BaseEntityState } from './base-entity.model';
import { BaseEntityQuery } from './base-entity.query';
import { BaseEntityStore } from './base-entity.store';

export abstract class BaseEntityService<T extends BaseEntityState<T>> {
    protected constructor(protected store: BaseEntityStore<T>, protected query: BaseEntityQuery<T>) {}

    get getData() {
        return this.query.getData();
    }

    get selectData$() {
        return this.query.selectData$();
    }

    /**
     * @example
     * this.updateDataValue<EntityModel>({ key: value})
     */
    updateDataValue(object: { [D in keyof T['data']]?: T['data'][D] }) {
        this.store.update((state) => ({
            ...state,
            data: {
                ...state.data,
                ...object
            }
        }));
    }

    updateParamsValue(object: { [D in keyof T['params']]?: T['params'][D] }) {
        this.store.update((state) => ({
            params: {
                ...state.params,
                ...object
            }
        }));
    }

    updatePayloadValue(object: { [D in keyof T['payload']]?: T['payload'][D] }) {
        this.store.update((state) => ({
            payload: {
                ...state.payload,
                ...object
            }
        }));
    }

    getDataValue<K extends keyof T['data']>(key: K): T['data'][K] {
        return this.query.getDataValue(key);
    }

    selectDataValue$(key: keyof T['data']) {
        return this.query.selectDataValue$(key);
    }

    getParamsValue<K extends keyof T['params']>(key: K): T['params'][K] {
        return this.query.getParamsValue(key);
    }

    reload() {
        this.query.reloading();
    }

    observable<O>(observable: Observable<O>): Observable<O> {
        this.store.setLoading(true);
        return this.query.reloading$.pipe(
            startWith(''),
            switchMap(() => observable),
            tap(() => {
                this.store.setLoading(false);
            })
        );
    }
}
