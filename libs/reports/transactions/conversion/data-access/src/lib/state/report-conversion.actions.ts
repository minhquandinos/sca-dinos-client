import { createAction } from '@datorama/akita-ng-effects';

export const reportConversionActions = (() => {
    const updatedColumns = createAction('Conversion Columns Storage Updated');

    const selectedFilters = createAction('Conversion Filters Storage Updated');

    return {
        updatedColumns,
        selectedFilters
    };
})();
