import { EntityState } from '@datorama/akita';
import { BehaviorSubject } from 'rxjs';

import { BasePagination } from '@scaleo/core/classes';
import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

/*
 * @Deprecated
 * use src/app/core/state/base-entity-state/base-entity.model.ts
 * */
export interface BaseListItemsState<T> extends EntityState<T> {
    ui: {
        params: BaseObjectModel;
        pagination: ApiPaginationModel;
        payload: BaseObjectModel;
    };
}

export interface BaseListItemsFiltersModel {
    params: BaseObjectModel;
    payload?: BaseObjectModel;
}

export interface BaseListItemsInterface extends BasePagination {
    updatePagination(pagination: ApiPaginationModel): void;
    setParams(params: BaseObjectModel): void;
    resetItemsList(): void;
    reloadItems$?: BehaviorSubject<boolean>;
}
