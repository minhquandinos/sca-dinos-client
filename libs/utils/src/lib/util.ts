import cloneDeep from 'lodash-es/cloneDeep';
import { default as _flow } from 'lodash-es/flow';
import { default as _groupBy } from 'lodash-es/groupBy';
import isEmpty from 'lodash-es/isEmpty';
import { default as _map } from 'lodash-es/map';
import orderBy from 'lodash-es/orderBy';
import { default as _partialRight } from 'lodash-es/partialRight';

import { BooleanEnum } from '@scaleo/core/data';

export class Util {
    static checkValidJsonParse(value: unknown, type: any = null): any {
        if (value && typeof value === 'string') {
            return JSON.parse(value);
        }

        if (type) {
            if (type === Object) {
                return {};
            }

            if (type === Array) {
                return [];
            }
        }
        return null;
    }

    static listToTree<T, R>(
        arr: T[],
        keyGroup: keyof T,
        keyGroupSort?: keyof T,
        keyChildrenSort?: keyof T,
        keyForChildren: string = 'items'
    ): R[] {
        const res = _flow(
            _partialRight(_groupBy, keyGroup),
            _partialRight(_map, (value: any, key: any) => {
                const groupS = keyGroupSort ? { groupSort: value[0][keyGroupSort] } : null;
                const children = keyChildrenSort ? orderBy(value, keyChildrenSort, 'asc') : value;
                const keyName = typeof key === 'string' ? key.toLowerCase().trim().replace(/ /g, '_') : key;
                return {
                    key: keyName,
                    [keyForChildren]: children,
                    [keyGroup]: keyName,
                    ...groupS
                };
            }),
            keyGroupSort ? (_partialRight(orderBy, keyGroupSort, 'asc') as any) : null
        );

        return res(arr) as R[];
    }

    static cloneDeep<T>(origin: T): T {
        return cloneDeep(origin);
    }

    static matchNum(value: string | unknown): number | undefined {
        const num = typeof value === 'string' ? value?.match(/\d+/g) : undefined;
        return num ? +num?.[0] : undefined;
    }

    static checkBase64Image(image: string): string {
        const base64Pattern = /data:image\/png;base64/i;

        return base64Pattern.test(image) ? image : '';
    }

    static cloneObject<T>(prototype: T, newObject: { [key: string]: unknown } = {}): T {
        if (!!prototype && typeof prototype === 'object') {
            return Object.create(Object.getPrototypeOf(prototype), Object.getOwnPropertyDescriptors({ ...prototype, ...newObject }));
        }
        return undefined;
    }

    static jsonParse<T = any>(json: string, empty: T = undefined): T | undefined {
        try {
            const parse = json ? JSON.parse(json) : undefined;
            if (parse) {
                return parse;
            }
        } catch (error) {
            return empty;
        }

        return empty;
    }

    static jsonStringify(value: any): string {
        if (typeof value !== 'string') {
            return JSON.stringify(value);
        }
        return value;
    }

    static isNotEmpty(origin: any): boolean {
        return !Util.isEmpty(origin);
    }

    static isEmpty(origin: any): boolean {
        if (Array.isArray(origin)) {
            return !origin?.length;
        }

        if (typeof origin === 'object') {
            return !Object.keys(origin)?.length;
        }

        return isEmpty(origin);
    }

    static isNumber(value: string): boolean {
        return !Number.isNaN(+value);
    }

    static stringToNumber(value: string, defaultNumber: number = 0): number {
        if (Util.isNumber(value)) {
            return +value;
        }
        return defaultNumber;
    }

    static numToBoolean(value: number): boolean {
        if (Number.isNaN(+value)) {
            return false;
        }
        return Boolean(+value);
    }

    static booleanToNum(value: boolean): BooleanEnum {
        return value ? BooleanEnum.True : BooleanEnum.False;
    }

    static isHexColor(color: string): boolean {
        if (!color || typeof color !== 'string') return false;

        // Validate hex values
        if (color.substring(0, 1) === '#') color = color.substring(1);

        switch (color.length) {
            case 3:
                return /^[0-9A-F]{3}$/i.test(color);
            case 6:
                return /^[0-9A-F]{6}$/i.test(color);
            case 8:
                return /^[0-9A-F]{8}$/i.test(color);
            default:
                return false;
        }
    }

    static isBase64(str: string) {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    static randomChars(chars: number = 8): string {
        return Math.random().toString(36).substr(chars, chars);
    }
}
