import { Injectable } from '@angular/core';
import { combineLatest, Observable, startWith, switchMap } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { DomainApi } from './domain.api';
import { DomainListModel } from './domain.model';
import { DomainListQuery } from './state/domain-list.query';
import { DomainListState, DomainListStore } from './state/domain-list.store';

@Injectable()
export class DomainListService extends BaseEntityService<DomainListState> {
    constructor(private api: DomainApi, protected readonly store: DomainListStore, protected readonly query: DomainListQuery) {
        super(store, query);
    }

    public index(id: number): Observable<DomainListModel[]> {
        return combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            switchMap(([queryParams]) =>
                this.api.index(id, queryParams).pipe(
                    tap(({ pagination }) => {
                        this.updateDataValue({ pagination });
                    }),
                    pluck('results'),
                    tap((results) => {
                        this.store.set(results);
                        this.store.setLoading(false);
                    }),
                    map((results) => results)
                )
            )
        );
    }
}
