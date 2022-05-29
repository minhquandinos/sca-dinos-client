import { Injectable } from '@angular/core';
import { combineLatest, mergeMap, Observable, startWith, Subject, switchMap, tap } from 'rxjs';

import { AffiliateDetailQuery } from '@scaleo/feature/manager/affiliate/detail/data-access';

import { AffiliateCountsModel } from './affiliate-counts.model';
import { AffiliateDetailStore } from './affiliate-detail.store';
import { AffiliateDetailCountsApi } from './affiliate-detail-counts.api';

@Injectable({ providedIn: 'root' })
export class AffiliateDetailCountsService {
    private _update$: Subject<void> = new Subject<void>();

    constructor(
        private readonly api: AffiliateDetailCountsApi,
        private readonly affiliateDetailStore: AffiliateDetailStore,
        private readonly affiliateDetailQuery: AffiliateDetailQuery
    ) {}

    counts(): Observable<AffiliateCountsModel> {
        return combineLatest([this.affiliateDetailQuery.select('id'), this._update$.pipe(startWith(''))]).pipe(
            switchMap(([id]) =>
                this.api.counts(id).pipe(
                    tap((counts) => {
                        this.affiliateDetailStore.update({
                            counts
                        });
                    })
                )
            )
        );
    }

    update(): void {
        this._update$.next();
    }
}
