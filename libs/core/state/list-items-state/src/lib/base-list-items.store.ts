import { Injectable } from '@angular/core';
import { EntityStore } from '@datorama/akita';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

import { BaseListItemsInterface, BaseListItemsState } from './base-list-items.model';

@Injectable()
/*
 * @Deprecated
 * use src/app/core/state/base-entity-state/base-entity.store.ts
 * */
export class BaseListItemsStore<T> extends EntityStore<BaseListItemsState<T>> implements BaseListItemsInterface {
    constructor(initialState: BaseListItemsState<T>) {
        super(initialState);
    }

    public updatePerPage(perPage: number): void {
        this.update((state) => ({
            ui: {
                ...state.ui,
                params: {
                    ...state.ui.params,
                    perPage
                }
            }
        }));
    }

    public updatePage(page: number): void {
        this.update((state) => ({
            ui: {
                ...state.ui,
                params: {
                    ...state.ui.params,
                    page
                }
            }
        }));
    }

    public updatePagination(pagination: ApiPaginationModel): void {
        this.update((state) => ({
            ui: {
                ...state.ui,
                pagination
            }
        }));
    }

    public setParams(params: BaseObjectModel): void {
        this.update((state) => ({
            ui: {
                ...state.ui,
                params: {
                    ...state.ui.params,
                    ...params
                }
            }
        }));
    }

    public resetItemsList(): void {
        this.reset();
        this.setLoading(true);
    }
}
