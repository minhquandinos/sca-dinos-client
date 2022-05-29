import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Filter2Interface, GetFilterInterface, Post2FiltersInterface } from './filter2.interface';
import { LocalStorageClass } from './localstorage.class';

/*
 * @deprecated
 * */
@Injectable()
export class Filter2Service {
    filtersSubject$: BehaviorSubject<Filter2Interface> = new BehaviorSubject<Filter2Interface>(null);

    private localStorage: LocalStorageClass;

    initFilter(storageName: string, defaultParams: Filter2Interface): void {
        this.localStorage = new LocalStorageClass(storageName);

        let paramsFromLocalStorage = this.localStorage.parse();
        if (!paramsFromLocalStorage) {
            paramsFromLocalStorage = defaultParams;
        } else {
            const params = {
                ...defaultParams.params,
                ...paramsFromLocalStorage.params
            };
            const payload = {
                ...defaultParams.payload,
                ...paramsFromLocalStorage.payload
            };
            paramsFromLocalStorage = { params, payload };
        }

        this.filtersSubject$.next(paramsFromLocalStorage);
    }

    changeParams(key: string, value: any): void {
        this.setParamOrPayload('params', key, value);
    }

    changeManyParams(filters: GetFilterInterface): void {
        this.setManyParams(filters);
    }

    changePayload(key: string, value: any): void {
        this.setParamOrPayload('payload', key, value);
    }

    changeManyPayload(filters: Post2FiltersInterface): void {
        this.setManyPayload(filters);
    }

    store(storeOnlyFields?: string[]): void {
        if (storeOnlyFields) {
            const originalFilter = JSON.parse(JSON.stringify(this.filtersSubject$.value));
            const newFilter: Filter2Interface = {};
            Object.keys(originalFilter).forEach((obj) => {
                storeOnlyFields.forEach((field) => {
                    if (originalFilter[obj][field]) {
                        (newFilter as any)[obj] = {
                            ...(newFilter as any)[obj],
                            [field]: originalFilter[obj][field]
                        };
                    }
                });
            });

            if (newFilter) {
                this.localStorage.store(newFilter);
            }
        } else {
            this.localStorage.store(this.filtersSubject$.value);
        }
    }

    reload(): void {
        this.filtersSubject$.next(this.filtersSubject$.value);
    }

    get filter(): Filter2Interface {
        return this.filtersSubject$.value;
    }

    setFilters(filters: Filter2Interface): void {
        const params: GetFilterInterface = {
            ...this.filter.params,
            ...filters.params
        };
        const payload: Post2FiltersInterface = {
            ...this.filter.payload,
            ...filters.payload
        };

        const newFilters: Filter2Interface = {
            params: {
                ...params
            },
            payload: {
                ...payload
            }
        };

        this.filtersSubject$.next(newFilters);
    }

    selectedAnyFilter(filters: any): boolean {
        return Object.keys(filters).some((element) => (filters[element] && filters[element].length > 0) === true);
    }

    private setParamOrPayload(object: 'params' | 'payload', key: string, value: any): void {
        const filters = { ...this.filtersSubject$.value };
        (filters as any)[object][key] = value;
        this.filtersSubject$.next(filters);
    }

    private setManyParams(filters: GetFilterInterface): void {
        this.filtersSubject$.next({
            ...this.filtersSubject$.value,
            params: {
                ...this.filtersSubject$.value.params,
                ...filters
            }
        });
    }

    private setManyPayload(filters: Post2FiltersInterface): void {
        this.filtersSubject$.next({
            ...this.filtersSubject$.value,
            payload: {
                ...this.filtersSubject$.value.payload,
                ...filters
            }
        });
    }
}
