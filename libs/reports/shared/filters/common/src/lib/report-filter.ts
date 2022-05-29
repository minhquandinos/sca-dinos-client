import { InjectionToken } from '@angular/core';

import { InvoiceStatusNameEnum, PlatformListsBaseInterface } from '@scaleo/platform/list/access-data';
import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ConcatReportFilters } from './concat-report-filters';
import { ReportFilterFilterEnum, ReportFilterModel, ReportFilterUnionType, ReportFilterValueTypeForArray } from './filter';

export const REPORT_DEFAULT_FILTERS_TOKEN = new InjectionToken<ReportFilterFilterEnum[]>('ReportDefaultFiltersToken');

// TODO refactor
export class ReportFilter {
    static initialPageFilters(defaultFilters: ReportFilterFilterEnum[] = []): ReportFilterModel[] {
        return defaultFilters.map((filter) => {
            return {
                filter,
                selected: true,
                isSaved: true,
                value: []
            };
        });
    }

    static convertFiltersValueToRequest(selectedFilters: ReportFilterModel[]): RequestPayloadFilter2Interface {
        if (!selectedFilters) {
            return undefined;
        }

        const filters: RequestPayloadFilter2Interface = {};

        (selectedFilters || [])?.forEach(({ value, filter }) => {
            if (typeof value === 'string') {
                filters[filter] = value.split('\n').join(',');
            }

            if (Array.isArray(value)) {
                filters[filter] = ReportFilter.convertFilterValueToRequest(filter, value);
            }
        });
        return filters;
    }

    static isPlatformListsBaseInterface(item: ReportFilterValueTypeForArray): item is PlatformListsBaseInterface {
        return (<PlatformListsBaseInterface>item).code !== undefined;
    }

    static appendNewFilterValue2(filters: ReportFilterModel[], filters2: ReportFilterModel[]): ReportFilterModel[] {
        const concatFilters = new ConcatReportFilters(filters, filters2);

        return concatFilters.filters();
    }

    private static convertFilterValueToRequest(filterKey: ReportFilterUnionType, value: unknown[]): string {
        switch (filterKey) {
            case ReportFilterFilterEnum.PaidToAffiliate:
                return value.map((elem) => +(elem === InvoiceStatusNameEnum.Paid)).join(',');
            default:
                return value.join(',');
        }
    }
}
