import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';
import { ReportFilterModel, ReportFiltersInterface } from '@scaleo/reports/shared/filters/common';

export interface ReportFilterState {
    list: ReportFiltersInterface[];
    selectedList: ReportFilterModel[];
}

const initialState = createBaseInitialState<ReportFilterState>({
    list: [],
    selectedList: []
});

@Injectable()
@StoreConfig({ name: `ReportFilters-${guid()}` })
export class ReportFilterStore extends BaseStateStore<any> {
    constructor() {
        super(initialState);
    }
}
