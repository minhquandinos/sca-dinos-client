import { Observable, pairwise, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';

import { Util } from './util';

export const objectUtil = (() => {
    const property = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

    const first = <T>(obj: T): T | undefined => {
        if (typeof obj === 'object') {
            const [firstEl = undefined] = Object.entries(obj) || [];
            return firstEl ? (Object?.fromEntries(new Map([firstEl])) as T) : undefined;
        }
        return undefined;
    };

    const removeProperty = <T extends BaseObjectModel>(obj: T, prop: string): void => {
        if (typeof obj === 'object') {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                delete obj[prop];
            }
        }
    };

    /**
     * Changed key of observable when other object except ky is changed;
     * @param observable$ - observable with object
     * @param key - reset key after params object changed.
     * @param value - reset to value after params object changed.
     */
    const mutationKeyWhenValuesChanges = <T, K extends keyof T>(observable$: Observable<T>, key: K, value: T[K]): Observable<T> => {
        const params$ = observable$;

        if (key) {
            return params$.pipe(
                startWith(undefined),
                pairwise(),
                map(([prev, current]: [T, T]) => {
                    if (!prev) {
                        return current;
                    }

                    const prevParams = Util.cloneDeep(prev);
                    const curParams = Util.cloneDeep(current);

                    if (prevParams?.[key] && curParams?.[key]) {
                        delete prevParams?.[key];
                        delete curParams?.[key];
                    }

                    if (JSON.stringify(prevParams) !== JSON.stringify(curParams)) {
                        return {
                            ...current,
                            [key]: value
                        };
                    }

                    return current;
                })
            );
        }

        return params$;
    };

    return {
        property,
        first,
        removeProperty,
        mutationKeyWhenValuesChanges
    };
})();
