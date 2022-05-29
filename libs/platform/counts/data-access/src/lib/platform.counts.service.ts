import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, pluck, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { PlatformCountsInterface } from './plarform-counts.model';

@Injectable({
    providedIn: 'root'
})
export class PlatformCountsService<T = PlatformCountsInterface> {
    private _counts$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    readonly counts$: Observable<T> = this._counts$.asObservable();

    private _update$: Subject<void> = new Subject<void>();

    constructor(private rest: RestApiService) {
        this.setPlatformCounts();
        this.update();
    }

    private fetchCounts(): Observable<T> {
        return this.rest.get<ApiResponse<PlatformCountsInterface>>('platform-counts-info').pipe(pluck('info'));
    }

    private setPlatformCounts(): void {
        this._update$
            .pipe(
                tap(() => {
                    this._counts$.next(null);
                }),
                switchMap(() => this.fetchCounts())
            )
            .subscribe((counts) => {
                this._counts$.next(counts);
            });
    }

    getCount<K extends keyof T>(key: K): Observable<T[K]> {
        return this._counts$.pipe(
            map((counts) => {
                return counts?.[key];
            })
        );
    }

    update(): void {
        this._update$.next();
    }
}
