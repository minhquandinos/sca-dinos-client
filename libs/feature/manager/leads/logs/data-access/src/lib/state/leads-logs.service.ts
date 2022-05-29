import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { combineLatest, debounceTime, filter, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ReportUtil } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { ArrayUtil } from '@scaleo/utils';

import { LeadsLogsApi } from '../api/leads-logs.api';
import { LeadsLogModel, LeadsLogPayloadDto, LeadsLogPayloadModel, LeadsLogsFiltersEnum } from '../model/leads-log.model';
import { LeadsLogsQuery } from './leads-logs.query';
import { LeadsLogsState, LeadsLogsStore } from './leads-logs.store';

@Injectable()
export class LeadsLogsService extends BaseEntityService<LeadsLogsState> {
    constructor(protected override store: LeadsLogsStore, private api: LeadsLogsApi, protected override query: LeadsLogsQuery) {
        super(store, query);
    }

    index(): Observable<LeadsLogModel[]> {
        const observable = combineLatest([this.query.selectParams$(), this.query.selectPayload$()]).pipe(
            filter(([, payload]) => {
                const { logType, columns } = payload;
                return !!columns && !!logType;
            }),
            debounceTime(300),
            switchMap(([queryParams, payload]) => {
                const payloadParams = this.convertPayloadParamsModelToDto(payload);
                return this.api.index(queryParams, payloadParams);
            }),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            map(({ results }) =>
                results?.map((item: LeadsLogModel[]) => ({
                    ...item,
                    id: guid()
                }))
            ),
            tap((entities) => {
                this.store.set(entities);
            })
        );

        return this.observable(observable);
    }

    getColumnsOptions(logType: string): Observable<ConfigTableColumn2Model[]> {
        const restoreColumns: string = this.query.getPayloadValue('columns');
        return this.api.getColumnsOptions(logType).pipe(
            map((columns) => {
                return ReportUtil.restoreDefaultColumns(columns, restoreColumns);
            })
        );
    }

    private convertPayloadParamsModelToDto(payload: LeadsLogPayloadModel): LeadsLogPayloadDto {
        const { offers, affiliates } = payload.filters;
        return {
            ...payload,
            filters: {
                [LeadsLogsFiltersEnum.Affiliates]: ArrayUtil.join(affiliates),
                [LeadsLogsFiltersEnum.Offers]: ArrayUtil.join(offers)
            }
        };
    }
}
