import { Injectable } from '@angular/core';

import { MultiSelectBlockFacade } from '../state/multi-select-block.facade';
import { MultiSelectFilteringService } from './multi-select-filtering.service';

@Injectable()
export class MultiSelectSearchService {
    constructor(private readonly stateFacade: MultiSelectBlockFacade, private filteringService: MultiSelectFilteringService) {}

    get isSearch(): boolean {
        return this.stateFacade.value.isSearch;
    }

    set isSearch(value: boolean) {
        this.stateFacade.store.update({ isSearch: value });
    }

    get searching(): boolean {
        return this.stateFacade.value.searching;
    }

    set searching(value: boolean) {
        this.stateFacade.store.update({ searching: value });
    }

    search(search: string) {
        this.isSearch = true;
        this.searching = !!search;
        this.filteringService.updateQueryParams({
            page: 1,
            search
        });

        if (!this.searching && this.stateFacade.query.getValue().tempSelected.length > 0) {
            this.stateFacade.store.update({
                tempSelected: []
            });
        }
    }
}
