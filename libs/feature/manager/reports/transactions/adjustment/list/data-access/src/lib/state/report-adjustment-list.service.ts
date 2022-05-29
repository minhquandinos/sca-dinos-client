import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { AdjustmentListModel } from '../adjustments.interface';
import { ReportAdjustmentsApi } from '../report-adjustments.api';
import { ReportAdjustmentListQuery } from './report-adjustment-list.query';
import { ReportAdjustmentListState, ReportAdjustmentListStore } from './report-adjustment-list.store';

@Injectable()
export class ReportAdjustmentListService extends BaseEntityService<ReportAdjustmentListState> {
    constructor(private api: ReportAdjustmentsApi, protected store: ReportAdjustmentListStore, protected query: ReportAdjustmentListQuery) {
        super(store, query);
    }

    index(): Observable<ApiResponseWithPagination<AdjustmentListModel>> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) => this.api.index(queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            tap((results) => {
                this.store.set(results);
            })
        );
        return this.observable(observable);
    }
}
