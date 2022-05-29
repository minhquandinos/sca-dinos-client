import { Injectable } from '@angular/core';

import { BaseEntityState } from './base-entity.model';
import { BaseEntityQuery } from './base-entity.query';
import { BaseEntityService } from './base-entity.service';
import { BaseEntityStore } from './base-entity.store';

@Injectable()
export abstract class BaseEntityCollectionService<
    T extends BaseEntityState,
    Store extends BaseEntityStore<T> = any,
    Query extends BaseEntityQuery<T> = any
> extends BaseEntityService<T> {
    protected constructor(protected store: Store, protected query: Query) {
        super(store, query);
    }

    setPage(page: number) {
        this.updateParamsValue({ page });
    }

    setPerPage(perPage: number) {
        this.updateParamsValue({ perPage });
    }

    setStatus<S = unknown>(status: S) {
        this.updateParamsValue({ status });
    }

    reload(config?: { clearEntity?: boolean; setLoading?: boolean }) {
        if (config?.clearEntity) {
            this.store.set([]);
        }
        if (config?.setLoading) {
            this.store.setLoading(true);
        }
        super.reload();
    }
}
