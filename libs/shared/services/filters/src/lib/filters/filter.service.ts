import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseObjectModel, HeaderFilterType, OrderByType, SortByType, StatusType } from '@scaleo/core/data';

import { FilterCopyInterface, FilterInterface, FiltersModelInterface, PostFiltersInterface } from './filter.interface';

@Injectable()
export class FilterService {
    public filtersSubject$: BehaviorSubject<FilterCopyInterface> = new BehaviorSubject<FilterCopyInterface>(null);

    public filter: FilterCopyInterface;

    public sortBy: SortByType = 'desc';
    public orderBy: OrderByType = 'id';
    public status: StatusType = 'active';
    public search: string;
    public type: HeaderFilterType = 'all';
    public page = 1;
    public perPage = 25;
    public headerFilter: HeaderFilterType = 'all';

    public storageConfigName: string;

    private static diffParamsObject(filter: FilterInterface, storageName: string): boolean {
        const params = FilterService.getParamsFromLocalStorage(storageName);
        if (!!params === false) {
            return false;
        }

        const copyFilter = { ...filter };
        delete copyFilter.search;

        return !(Object.entries(copyFilter).toString() === Object.entries(params).toString());
    }

    private static getParamsFromLocalStorage(storageName: string): BaseObjectModel {
        return JSON.parse(localStorage.getItem(storageName));
    }

    public setFilters(filters: FilterCopyInterface): void {
        const filterValue: any = {};

        Object.keys(filters).forEach((filter: any) => {
            filterValue[filter] = filters[filter as keyof FilterCopyInterface];
        });

        this.filtersSubject$.next(Object.assign(this.filtersSubject$.value, filterValue));
    }

    public changeFilter(key: string, value: any): void {
        this.filtersSubject$.next({
            ...this.filtersSubject$.value,
            [key]: value
        });
    }

    public changeHeaderFilter(key: string, value: any): void {
        const newFilterParams = this.generateNewParamsForFilters(key, value);

        this.filtersSubject$.next(newFilterParams);
    }

    public savedToLocalStorage(): void {
        const filter: FilterCopyInterface = this.filtersSubject$.value;
        if (
            FilterService.diffParamsObject(filter, this.storageConfigName) ||
            !!FilterService.getParamsFromLocalStorage(this.storageConfigName) === false
        ) {
            const copyFilter = {
                ...filter,
                page: 1,
                search: ''
            };

            localStorage.setItem(this.storageConfigName, JSON.stringify(copyFilter));
        }
    }

    public initFilter(storageName?: string, filters?: FilterCopyInterface): void {
        this.storageConfigName = storageName;

        if (localStorage.getItem(this.storageConfigName)) {
            this.filtersSubject$.next(FilterService.getParamsFromLocalStorage(this.storageConfigName));
        } else {
            const defaultConfig = {
                sortField: this.orderBy,
                sortDirection: this.sortBy,
                status: this.status,
                search: '',
                type: this.type,
                page: this.page,
                perPage: this.perPage,
                headerFilter: this.headerFilter
            };

            this.filtersSubject$.next(filters && Object.keys(filters).length > 0 ? filters : defaultConfig);
        }
    }

    public convertFiltersFromLocalStorage<T>(filters: FiltersModelInterface | PostFiltersInterface): any {
        const filterModel: any = {};

        if (this.filtersSubject$.value) {
            Object.keys(filters).forEach((filter) => {
                if (this.filtersSubject$.value.postFilters) {
                    filterModel[filter] = this.filtersSubject$.value.postFilters[filter as keyof PostFiltersInterface];
                } else {
                    filterModel[filter] = this.filtersSubject$.value[filter as keyof FilterCopyInterface];
                }
            });
        }

        return Object.keys(filterModel).length > 0 ? filterModel : filters;
    }

    public checkSelectedAnyFilter(filters: FiltersModelInterface | PostFiltersInterface): boolean {
        const selectedAnyFilter: any[] = [];

        if (filters && Object.keys(filters).length > 0) {
            Object.keys(filters).forEach((filter) => {
                selectedAnyFilter.push((filters as any)[filter] && (filters as any)[filter].length > 0);
            });
        }

        return selectedAnyFilter.some((element) => element === true);
    }

    public reload(): void {
        this.filtersSubject$.next(this.filtersSubject$.value);
    }

    private generateNewParamsForFilters(key: string, value: HeaderFilterType): FilterCopyInterface {
        const oldFilters = { ...this.filtersSubject$.value };
        const newFilters = { ...this.filtersSubject$.value };

        if (['all', 'pending', 'my', 'premium'].includes(key)) {
            if (newFilters.onlyMine) {
                delete newFilters.onlyMine;
            }
            if (newFilters.type) {
                delete newFilters.type;
            }
        }

        if (key === 'pending') {
            newFilters.status = 'pending';
        }

        if (key === 'my') {
            newFilters.onlyMine = 'yes';
        }

        if (key === 'type') {
            newFilters.type = 'premium';
        }

        return {
            ...newFilters,
            headerFilter: value,
            status: oldFilters.headerFilter === 'pending' ? 'active' : newFilters.status
        };
    }
}
