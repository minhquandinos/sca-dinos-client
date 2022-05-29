import { Injectable, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { tap } from 'rxjs/operators';

import { LocalAsyncStorageService } from '@scaleo/core/storage/local';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { ArrayUtil } from '@scaleo/utils';

import { reportConversionActions } from './report-conversion.actions';
import { ReportConversionsQuery } from './report-conversions.query';
import { ReportConversionsStore } from './report-conversions.store';

@Injectable()
export class ReportConversionEffects {
    constructor(
        private actions$: Actions,
        private readonly localAsyncStorageService: LocalAsyncStorageService,
        @Optional() private readonly query: ReportConversionsQuery,
        @Optional() private readonly store: ReportConversionsStore
    ) {}

    @Effect()
    allActionsProducts = this.actions$.pipe(tap((action) => console.log('test effect', action)));

    @Effect()
    updatedColumns = this.actions$.pipe(
        ofType(reportConversionActions.updatedColumns),
        tap(() => {
            this.localAsyncStorageService.setItem(this.store?.storeName, { columns: this.query.getValue()?.data?.columns || '' });
        })
    );

    @Effect()
    selectedFilters = this.actions$.pipe(
        ofType(reportConversionActions.selectedFilters),
        tap(() => {
            const savedFilters = (this.query.getValue()?.data?.selectedFilters as ReportFilterModel[]).filter(({ isSaved }) => !!isSaved);
            this.localAsyncStorageService.setItem(this.store?.storeName, { filters: ArrayUtil.pickByKey(savedFilters || [], 'filter') });
        })
    );
}
