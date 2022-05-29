import { Type } from '@angular/core';

import { ReportFilterUnionType } from './filter';

export interface ReportFiltersSelectedComponentModel {
    list: ReportFilterUnionType[];
    component: Type<any> | string;
    instance: {
        keyForFormControl: string;
        hideSelected?: boolean;
        multiple?: boolean;
        itemValue?: string;
        itemLabel?: string;
        hideDropdownArrow?: boolean;
        [key: string]: unknown;
    };
}

type InstanceType<T> = { [PropertyType in keyof T]: T[PropertyType] } | { keyForFormControl: string };
