import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';
import { ReportFilterModel, ReportFilterUnionType } from '@scaleo/reports/shared/filters/common';

import { ReportFilterState, ReportFilterStore } from './report-filter.store';

@Injectable()
export class ReportFilterQuery extends BaseStateQuery<ReportFilterState> {
    constructor(protected store: ReportFilterStore) {
        super(store);
    }

    get filtersSelected(): ReportFilterModel[] {
        return this.getValue().selectedList;
    }

    filterSelected(filter: ReportFilterUnionType): ReportFilterModel {
        return this.getValue().selectedList.find((elem) => elem.filter === filter);
    }
}
