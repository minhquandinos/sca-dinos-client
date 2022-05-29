import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { TeammateListApi } from '../api/teammate-list.api';
import { TeammateListModel } from '../teammate-list.model';
import { TeammateListQuery } from './teammate-list.query';
import { TeammateListState, TeammateListStore } from './teammate-list.store';

@Injectable()
export class TeammateListService extends BaseEntityService<TeammateListState> {
    constructor(protected store: TeammateListStore, protected query: TeammateListQuery, private api: TeammateListApi) {
        super(store, query);
    }

    index(): Observable<TeammateListModel[]> {
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
