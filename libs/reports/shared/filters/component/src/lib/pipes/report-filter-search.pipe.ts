import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ReportFilterModel, ReportFiltersInterface } from '@scaleo/reports/shared/filters/common';

@Pipe({
    name: 'reportFilterSearch'
})
export class ReportFilterSearchPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    public transform(items: ReportFiltersInterface[], searchText: string): ReportFiltersInterface[] {
        if (!items) return [];
        if (!searchText) return items;

        return items
            .filter((filterGroup) => filterGroup.group.toLowerCase() !== 'popular')
            .map((filterGroup: ReportFiltersInterface) => {
                const filterItems: ReportFilterModel[] = filterGroup.items.filter((filter: ReportFilterModel) => {
                    const translate = this.translateService.instant(`reports_page.filters.${filter.filter}`);
                    return translate.toLowerCase().includes(searchText.toLowerCase());
                });

                return {
                    ...filterGroup,
                    items: filterItems
                };
            })
            .filter((filterGroup: ReportFiltersInterface) => filterGroup.items.length > 0);
    }
}
