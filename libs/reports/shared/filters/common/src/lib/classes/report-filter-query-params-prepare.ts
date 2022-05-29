import { BaseObjectModel } from '@scaleo/core/data';

import { ReportFilterFilterEnum, ReportFilterModel } from '../filter/models/report-filters.model';

export class ReportFilterQueryParamsPrepare {
    constructor(private params: BaseObjectModel) {}

    get filters(): ReportFilterModel[] {
        const params = this.params;
        const selectedFilters: ReportFilterModel[] = [];
        Object.entries(params)
            .filter(([filter]) => {
                return Object.values(ReportFilterFilterEnum).includes(filter as ReportFilterFilterEnum);
            })
            .forEach(([filter, value]) => {
                selectedFilters.push(this.prepareParam(filter as ReportFilterFilterEnum, value));
            });

        return selectedFilters;
    }

    private changeValueType(value: number | string): number[] | string {
        if (!isNaN(+value)) {
            return [+value];
        }

        if (typeof value === 'string') {
            return value.toString();
        }

        return undefined;
    }

    private prepareParam(filterName: ReportFilterFilterEnum, value: string | number): ReportFilterModel {
        if (filterName && value) {
            const changeValueType = this.changeValueType(value);

            if (changeValueType) {
                return {
                    filter: filterName,
                    value: changeValueType,
                    selected: true
                };
            }
        }
        return undefined;
    }
}
