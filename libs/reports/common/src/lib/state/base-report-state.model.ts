import { PersistState, persistState } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { UiTable2ColumnDirectionType, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { StatisticModel } from '../model';

export interface BaseReportState<T = any> extends BaseEntityState<StatisticModel> {
    data?: {
        sort: UiTable2SortColumnModel;
        columns: string;
        page: number;
        perPage: number;
        pagination: ApiPaginationModel;
        selectedFilters: ReportFilterModel[];
    } & T;
}

export interface InitialBaseReportOptionsModel {
    filters: ReportFilterModel[];
    columns: string;
}

export const initialBaseReport = (options: Partial<InitialBaseReportOptionsModel>) => {
    return createEntityInitialState({
        data: {
            sort: {
                field: 'added_timestamp',
                direction: 'desc' as UiTable2ColumnDirectionType
            },
            columns: options?.columns || null,
            page: 1,
            perPage: 25,
            pagination: null,
            selectedFilters: options?.filters || []
        }
    });
};

export const initialBaseReportPersistState = (stateName: string, storageName: string = undefined): PersistState => {
    return persistState({
        include: [stateName],
        key: storageName || stateName,
        preStorageUpdate(storeName, state) {
            if (storeName === stateName) {
                return {
                    columns: state.data?.columns || ''
                };
            }

            return state;
        },
        preStoreUpdate(storeName, state, initialState) {
            if (storeName === stateName) {
                return {
                    ...initialState,
                    data: {
                        ...initialState.data,
                        columns: state?.columns || ''
                    }
                };
            }

            return state;
        }
    });
};
