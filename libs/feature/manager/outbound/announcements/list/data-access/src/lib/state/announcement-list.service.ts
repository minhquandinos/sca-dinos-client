import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { AnnouncementsListModel } from '../announcement-list.model';
import { AnnouncementListApi } from '../api/announcement-list.api';
import { AnnouncementListQuery } from './announcement-list.query';
import { AnnouncementListState, AnnouncementListStore } from './announcement-list.store';

@Injectable()
export class AnnouncementListService extends BaseEntityService<AnnouncementListState> {
    constructor(protected store: AnnouncementListStore, protected query: AnnouncementListQuery, private readonly api: AnnouncementListApi) {
        super(store, query);
    }

    index(): Observable<AnnouncementsListModel[]> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) =>
                this.api.index(queryParams).pipe(
                    tap(({ pagination }) => {
                        this.updateDataValue({ pagination });
                    }),
                    pluck('results')
                )
            ),
            tap((results) => {
                this.store.set(results);
            })
        );

        return this.observable(observable);
    }
}
