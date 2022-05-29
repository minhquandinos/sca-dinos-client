import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { LeadsLogsState, LeadsLogsStore } from './leads-logs.store';

@Injectable()
export class LeadsLogsQuery extends BaseEntityQuery<LeadsLogsState> {
    // readonly currentLeadsLogsPath = this.route.snapshot.routeConfig.path as LeadsLogEnum;?

    constructor(protected override store: LeadsLogsStore, private route: ActivatedRoute) {
        super(store);
    }

    // get prepareParams$(): Observable<Filter2Interface> {
    //     return combineQueries([
    //         this.columnsPayload$,
    //         this.selectDataValue$('sortField'),
    //         this.selectDataValue$('sortDirection'),
    //         this.selectDataValue$('page'),
    //         this.selectDataValue$('perPage'),
    //         this.selectDataValue$('rangeFrom'),
    //         this.selectDataValue$('rangeTo'),
    //         this.selectDataValue$('logType'),
    //         this.selectDataValue$('filters')
    //     ]).pipe(
    //         map(([columns, sortField, sortDirection, page, perPage, rangeFrom, rangeTo, logType, filters]) => ({
    //             params: {
    //                 sortField,
    //                 sortDirection,
    //                 page,
    //                 perPage
    //             },
    //             payload: {
    //                 columns,
    //                 rangeFrom,
    //                 rangeTo,
    //                 logType,
    //                 filters
    //             }
    //         }))
    //     );
    // }

    // get columnsPayload$(): Observable<string> {
    //     return this.selectDataValue$('columns').pipe(map((columnsByLogType) => columnsByLogType[this.currentLeadsLogsPath]));
    // }

    get columns$(): Observable<UiTable2ColumnsModel[]> {
        return this.selectPayloadValue$('columns').pipe(
            map((columns) => {
                return columns.split(',').map((column) => ({
                    value: column,
                    translate: `table.column.${column}`
                }));
            })
        );
    }

    get pagination$(): Observable<ApiPaginationModel> {
        return this.selectDataValue$('pagination');
    }

    get rangeFrom$(): Observable<string> {
        return this.selectPayloadValue$('rangeFrom');
    }

    get rangeTo$(): Observable<string> {
        return this.selectPayloadValue$('rangeTo');
    }
}
