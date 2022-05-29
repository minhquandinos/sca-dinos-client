import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersistState, persistState } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import { LeadsLogModel, LeadsLogPayloadModel, LeadsLogQueryParamsModel, LeadsLogsFiltersEnum } from '../model/leads-log.model';

const defaultColumns = 'added_timestamp,result,affiliate,offer,goal,api_request,api_body';

export interface LeadsLogsState extends BaseEntityState<LeadsLogModel[]> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: LeadsLogQueryParamsModel;
    payload?: LeadsLogPayloadModel;
}

export const initialState = (date: CustomDateRangeService) => {
    const { rangeFrom, rangeTo } = date;
    return createEntityInitialState<LeadsLogsState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10,
            sortField: 'added_timestamp',
            sortDirection: 'desc'
        },
        payload: {
            logType: undefined,
            rangeFrom,
            rangeTo,
            columns: defaultColumns,
            filters: {
                [LeadsLogsFiltersEnum.Affiliates]: [],
                [LeadsLogsFiltersEnum.Offers]: []
            }
        }
    });
};

@Injectable()
export class LeadsLogsStore extends BaseEntityStore<LeadsLogsState> {
    constructor(private customDateRange: CustomDateRangeService, private route: ActivatedRoute) {
        super(initialState(customDateRange), {
            name: `${ManagerStateNameEnum.LeadsLogs}-${route.snapshot.data?.['logType'] || 'undefined'}`,
            resettable: true
        });
        const logType = route.snapshot.data?.['logType'] || 'undefined';
        const storeName = `${ManagerStateNameEnum.LeadsLogs}-${logType}`;
        const storageName = `scaleo__managerLeadsLogsListStore_${logType}`;
        initialBaseLeadsLogsPersistState(storeName, storageName);
    }
}

export const initialBaseLeadsLogsPersistState = (stateName: string, storageName: string = undefined): PersistState => {
    return persistState({
        include: [stateName],
        key: storageName || stateName,
        preStorageUpdate(storeName, state) {
            if (storeName === stateName) {
                return {
                    columns: state.payload?.columns || ''
                };
            }

            return state;
        },
        preStoreUpdate(storeName, state, initialState) {
            if (storeName === stateName) {
                return {
                    ...initialState,
                    payload: {
                        ...initialState.payload,
                        columns: state?.columns || defaultColumns
                    }
                };
            }

            return state;
        }
    });
};
