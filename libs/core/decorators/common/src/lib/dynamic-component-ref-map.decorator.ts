import { Type } from '@angular/core';

export const dynamicComponentLookupRegistry: Map<string, Type<any>> = new Map();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DynamicComponentLookup = (key: string): any => {
    return (cls: Type<any>) => {
        dynamicComponentLookupRegistry.set(key, cls);
    };
};

export const dynamicComponentLookup = (cls: Type<any>, name: string): void => {
    dynamicComponentLookupRegistry.set(name, cls);
};
