import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, startWith, Subject, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { DomainApi } from './domain.api';
import { DomainListModel, DomainListQueryParamsDto } from './domain.model';

@Injectable()
export class DomainWidgetListService {
    private _update$: Subject<void> = new Subject();

    private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    readonly loading$ = this._loading$.asObservable();

    constructor(private api: DomainApi) {}

    index(id: number): Observable<ApiResponseWithPagination<DomainListModel[]>> {
        const queryParams: DomainListQueryParamsDto = {
            sortField: 'id',
            sortDirection: 'desc',
            status: PlatformListsStatusesNameEnum.Active
        };

        return this._update$.pipe(
            startWith(''),
            switchMap(() => this.api.index(id, queryParams)),
            tap(() => {
                if (this._loading$.value) {
                    this._loading$.next(false);
                }
            })
        );
    }

    update(): void {
        this._update$.next();
    }
}
