import { Injectable, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { tap } from 'rxjs/operators';

import { LocalAsyncStorageService } from '@scaleo/core/storage/local';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { ArrayUtil } from '@scaleo/utils';

import { newReportStatisticsActions } from './new-report-statistics.actions';
import { NewReportStatisticsQuery } from './new-report-statistics.query';
import { NewReportStatisticsStore } from './new-report-statistics.store';

@Injectable()
export class NewReportStatisticsEffects {
    constructor(
        private actions$: Actions,
        private readonly localAsyncStorageService: LocalAsyncStorageService,
        @Optional() private readonly query: NewReportStatisticsQuery,
        @Optional() private readonly store: NewReportStatisticsStore
    ) {}

    @Effect()
    updatedColumns = this.actions$.pipe(
        ofType(newReportStatisticsActions.updatedColumns),
        tap(() => {
            this.localAsyncStorageService.setItem(this.store?.storeName, { columns: this.query.getValue()?.data?.columns || '' });
        })
    );

    @Effect()
    selectedFilters = this.actions$.pipe(
        ofType(newReportStatisticsActions.selectedFilters),
        tap(() => {
            const savedFilters = (this.query.getValue()?.data?.selectedFilters as ReportFilterModel[]).filter(({ isSaved }) => !!isSaved);
            this.localAsyncStorageService.setItem(this.store?.storeName, { filters: ArrayUtil.pickByKey(savedFilters || [], 'key') });
        })
    );
}
