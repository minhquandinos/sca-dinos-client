import { EntityStore, StoreConfigOptions } from '@datorama/akita';

import { BaseEntityInitialState, baseEntityInitialState, BaseEntityState } from './base-entity.model';

export class BaseEntityStore<T> extends EntityStore<BaseEntityState<T>> {
    constructor(initialState: BaseEntityInitialState<T> = baseEntityInitialState(), options?: Partial<StoreConfigOptions>) {
        super(initialState, options);
    }
}
