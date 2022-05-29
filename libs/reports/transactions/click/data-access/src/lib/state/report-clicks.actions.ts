import { createAction } from '@datorama/akita-ng-effects';

export const reportClicksActions = (() => {
    const updatedColumns = createAction('Click Columns Storage Updated');

    const selectedFilters = createAction('Click Filters Storage Updated');

    return {
        updatedColumns,
        selectedFilters
    };
})();
