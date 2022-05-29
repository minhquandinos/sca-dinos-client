import orderBy from 'lodash-es/orderBy';

import { SortByType } from '@scaleo/core/data';

export class ArrayUtil {
    static join<T = any>(arr: T[], delimiter: string = ',', key?: keyof T): string | undefined {
        if (Array.isArray(arr)) {
            if (key) {
                return arr.map((elem) => elem[key]).join(delimiter);
            }
            return arr.join(delimiter);
        }
        return undefined;
    }

    static joinByKey<T, K extends keyof T>(arr: T[], key: K): string | undefined {
        return Array.isArray(arr) ? ArrayUtil.join(ArrayUtil.pickByKey(arr, key)) : '';
    }

    static createContainingArray(count: number, containing?: unknown | 'numeric' | Record<string, unknown>): unknown[] {
        const array = Array(count);

        if (containing === 'numeric') {
            return [...array.keys()].map((num) => num + 1);
        }

        if (containing) {
            return [...array.keys()].map(() => containing);
        }

        return [...Array(count)];
    }

    static updateByKey<T>(arr: T[], compareKey: string = 'id', compareValue: unknown, newValue: T): T[] {
        return arr.map((elem: any) => (elem[compareKey] === compareValue ? newValue : elem));
    }

    static first<T>(arr: T[]): T | undefined {
        const [first = undefined] = arr || [];
        return first;
    }

    static last<T>(arr: T[]): T | undefined {
        const i = arr.length > 0 ? arr.length - 1 : -1;
        const { [i]: last = undefined } = arr || [];
        return last;
    }

    static pickByKey<T, K extends keyof T>(arr: T[], key: K): Array<T[K]> {
        return arr.map((item: any) => item?.[key]).filter((item) => !!item);
    }

    static findByKey<T, K extends keyof T>(arr: T[], key: K, compareValue: T[K]): T | undefined {
        return Array.isArray(arr) ? arr?.find((item: T) => item?.[key] === compareValue) : undefined;
    }

    static orderBy<T>(arr: T[], order: keyof T | Array<keyof T>, by: SortByType = 'asc'): T[] {
        return orderBy(arr, order, by);
    }

    static unique<U>(acc: U[], items: U[], key: keyof U): U[] {
        const uniqueItems = new Map(acc.concat(items).map((elem) => [elem[key], elem]));
        return Array.from(uniqueItems.values());
    }

    static removeByKey<T, K extends keyof T>(arr: T[], key: K, value: T[K]): T[] {
        return Array.isArray(arr) ? arr.filter((item: T) => item?.[key] !== value) : [];
    }
}
