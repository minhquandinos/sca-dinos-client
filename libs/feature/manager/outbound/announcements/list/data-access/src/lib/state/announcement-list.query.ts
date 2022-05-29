import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AnnouncementListState, AnnouncementListStore } from './announcement-list.store';

@Injectable()
export class AnnouncementListQuery extends BaseEntityQuery<AnnouncementListState> {
    readonly totalCount$ = this.selectDataValue$('pagination').pipe(pluck('total_count'));

    constructor(protected store: AnnouncementListStore) {
        super(store);
    }
}
