import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AdvertiserListState, AdvertiserListStore } from './advertiser-list.store';

@Injectable()
export class AdvertiserListQuery extends BaseEntityQuery<AdvertiserListState> {
    constructor(protected store: AdvertiserListStore) {
        super(store);
    }

    get pagination$(): Observable<ApiPaginationModel> {
        return this.selectDataValue$('pagination');
    }
}
