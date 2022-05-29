import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

import { AffiliateListCountsApi } from './affiliate-list-counts.api';
import { AffiliateListCountsModel } from './affiliate-list-counts.model';

@Injectable()
export class AffiliateListCountsService {
    private _update$: Subject<void> = new Subject();

    constructor(private readonly api: AffiliateListCountsApi) {}

    counts(): Observable<AffiliateListCountsModel> {
        return this._update$.pipe(
            startWith(''),
            switchMap(() => this.api.counts())
        );
    }

    update(): void {
        this._update$.next();
    }
}
