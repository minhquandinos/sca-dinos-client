import { BaseObjectModel } from '@scaleo/core/data';

export const compareWithFnUtil = (
    item: BaseObjectModel,
    selected: BaseObjectModel,
    value: string | number,
    defaultKey: string = 'id'
): boolean => {
    const key = value || defaultKey;
    const selectedKey = typeof selected === 'object' ? selected[key] : selected;

    return item[key] === selectedKey;
};
