import { Store, StoreConfigOptions } from '@datorama/akita';

import { BaseStateQuery, BaseStateService, BaseStateStore } from './base.state';

export abstract class BaseCollectionStore<T> extends BaseStateStore<T> {
    protected constructor(protected initialState: Partial<T> = {}, protected options: Partial<StoreConfigOptions> = {}) {
        super(initialState, options);
    }
}

export abstract class BaseCollectionQuery<T> extends BaseStateQuery<T> {
    protected constructor(protected store: Store<T>) {
        super(store);
    }
}

export abstract class BaseCollectionService<T> extends BaseStateService<T> {
    protected constructor(protected store: BaseCollectionStore<T>, protected query: BaseCollectionQuery<T>) {
        super(store, query);
    }
}
