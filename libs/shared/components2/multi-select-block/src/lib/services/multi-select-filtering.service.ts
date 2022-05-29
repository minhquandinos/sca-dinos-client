import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, skip, switchMap, tap, throttleTime } from 'rxjs/operators';

import { MultiSelectBlockFacade } from '../state/multi-select-block.facade';
import { MultiSelectBlockQueryParamsType } from '../types/multi-select-block.type';

@Injectable()
export class MultiSelectFilteringService {
    constructor(private readonly stateFacade: MultiSelectBlockFacade) {}

    get searching(): boolean {
        return this.stateFacade.value.searching;
    }

    get perPage(): number {
        return this.stateFacade.value.queryParams.perPage || 20;
    }

    set searching(value: boolean) {
        this.stateFacade.store.update({ searching: value });
    }

    set exclude(value: unknown[]) {
        this.stateFacade.store.update({
            exclude: value
        });
    }

    nextPage(): void {
        const { queryParams, pagination, items } = this.stateFacade.value;
        if (items.length > 0) {
            const { page } = queryParams;
            const { page_count } = pagination;
            if (!page_count) {
                this.setNextPage(page);
            } else if (page + 1 <= page_count) {
                this.setNextPage(page + 1);
            }
        }
    }

    updateQueryParams(value: MultiSelectBlockQueryParamsType): void {
        this.stateFacade.store.update({
            queryParams: {
                ...this.stateFacade.value.queryParams,
                ...value
            }
        });
    }

    reload(): void {
        this.setNextPage(1);
    }

    nextPageOnChangeItems(): Observable<any> {
        return this.stateFacade.query.select('exclude').pipe(
            skip(1),
            filter((exclude) => exclude.length > 0),
            throttleTime(300),
            switchMap(() =>
                combineLatest([
                    this.stateFacade.query.select('items'),
                    this.stateFacade.query.select('selected'),
                    this.stateFacade.query.select('exclude')
                ])
            ),
            tap(([items, selected, exclude]) => {
                if (items.length - selected.length - exclude.length < this.perPage) {
                    this.nextPage();
                }
            })
        );
    }

    private setNextPage(page: number): void {
        this.stateFacade.store.update({
            queryParams: {
                ...this.stateFacade.value.queryParams,
                page
            }
        });
    }
}
