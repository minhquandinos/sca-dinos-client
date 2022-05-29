import { createAction } from '@datorama/akita-ng-effects';

export const newReportStatisticsActions = (() => {
    const updatedColumns = createAction('Statistic Columns Storage Updated');

    const selectedFilters = createAction('Statistic Filters Storage Updated');

    return {
        updatedColumns,
        selectedFilters
    };
})();
