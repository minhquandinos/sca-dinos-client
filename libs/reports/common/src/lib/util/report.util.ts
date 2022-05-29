import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';

export class ReportUtil {
    static restoreDefaultColumns(columns: ConfigTableColumn2Model[], savedColumns: string): ConfigTableColumn2Model[] {
        const savedColumnsArr = savedColumns?.split(',');
        const isSavedColumns = savedColumnsArr?.length > 0;

        return columns.map((group) => ({
            ...group,
            items: group.items.map((column) => {
                let defaultColumn = isSavedColumns ? 0 : column.default;

                if (savedColumnsArr?.includes(column.key)) {
                    defaultColumn = savedColumnsArr.includes(column.key) ? 1 : 0;
                }

                return {
                    ...column,
                    default: defaultColumn
                };
            })
        }));
    }

    static getSavedSelectedFilters(selectedFilters: ReportFilterModel[]): ReportFilterModel[] {
        return selectedFilters
            .filter((filter) => !!filter.isSaved)
            .map((filter) => ({
                ...filter,
                selected: true,
                isSaved: filter.isSaved,
                value: Array.isArray(filter.value) ? [] : ''
            }));
    }
}
