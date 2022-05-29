import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { AffiliateDashboardPendingRecordsCountApi } from './affiliate-dashboard-pending-records-count.api';
import { AffiliateDashboardPendingRecordsCountModel } from './affiliate-dashboard-pending-records-count.model';

@Injectable()
export class AffiliateDashboardPendingRecordsCountService {
    private _counts$: BehaviorSubject<AffiliateDashboardPendingRecordsCountModel> =
        new BehaviorSubject<AffiliateDashboardPendingRecordsCountModel>(undefined);

    readonly counts$ = this._counts$.asObservable();

    constructor(private api: AffiliateDashboardPendingRecordsCountApi) {}

    getCounts(): Observable<AffiliateDashboardPendingRecordsCountModel> {
        return this.api.getCounts().pipe(
            tap((counts) => {
                this._counts$.next(counts);
            })
        );
    }
}
