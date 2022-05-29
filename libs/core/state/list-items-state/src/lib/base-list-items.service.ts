import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { BehaviorSubject } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

import { BaseListItemsInterface } from './base-list-items.model';

@Injectable()
/*
 * @Deprecated
 * use src/app/core/state/base-entity-state/base-entity.service.ts
 * */
export class BaseListItemsService<T extends BaseListItemsInterface & Store> implements BaseListItemsInterface {
    public readonly reloadItems$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    protected pagePath: string;

    // protected storeRoleUiService: PlatformStoreRoleUiService
    constructor(protected store: T, protected storeRoleUiService: any) {}

    public updatePage(page: number): void {
        this.store.updatePage(page);
    }

    public updatePerPage(perPage: number): void {
        this.store.updatePerPage(perPage);
    }

    public updatePagination(pagination: ApiPaginationModel): void {
        this.store.updatePagination(pagination);
    }

    public setParams(params: BaseObjectModel): void {
        const newParams = JSON.parse(JSON.stringify(params)); // Util.cloneDeep(params);
        if (newParams.visibility) {
            delete newParams.visibility;
        }
        this.store.setParams(newParams);
        this.setParamsValueToStore({
            ...this.store.getValue().ui.params,
            ...newParams
        });
    }

    protected setParamsValueToStore(params: BaseObjectModel): void {
        this.storeRoleUiService.set(this.pagePath, { params });
    }

    public reloadItemsList(): void {
        this.reloadItems$.next(true);
    }

    public resetItemsList(): void {
        this.store.resetItemsList();
    }

    public updateParams(param: BaseObjectModel, saveParams?: boolean): void {
        this.store.setParams(param);

        if (saveParams) {
            const params = {
                ...this.getLocalStorageParamsValue,
                ...param
            };
            this.setParamsValueToStore(params);
        }
    }

    public get getLocalStorageParamsValue(): BaseObjectModel {
        // this.storeRoleUiService.getPageKey<BaseListItemsFiltersModel, 'params'>(this.pagePath, 'params');
        return this.storeRoleUiService.getPageKey(this.pagePath, 'params');
    }

    public setPathPage(pagePath: string): void {
        this.pagePath = pagePath;
    }
}
