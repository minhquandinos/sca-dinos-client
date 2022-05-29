import { Injectable } from '@angular/core';
import { EntityStore, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

import { BaseListItemsState } from './base-list-items.model';

@Injectable()
/*
 * @Deprecated
 * use src/app/core/state/base-entity-state/base-entity.query.ts
 * */
export class BaseListItemsQuery<T> extends QueryEntity<BaseListItemsState<T>> {
    constructor(protected store: EntityStore<BaseListItemsState<T>>) {
        super(store);
    }

    get pagination$(): Observable<ApiPaginationModel> {
        return this.select((state) => state.ui.pagination);
    }

    get params$(): Observable<BaseObjectModel> {
        return this.select((state) => state.ui.params);
    }

    get payload$(): Observable<BaseObjectModel> {
        return this.select((state) => state.ui.payload);
    }

    get getParams(): Partial<BaseObjectModel> {
        return this.getValue().ui.params;
    }
}
