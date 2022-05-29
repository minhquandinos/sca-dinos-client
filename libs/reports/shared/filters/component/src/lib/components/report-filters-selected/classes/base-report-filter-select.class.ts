import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { compareWithFnUtil } from '@scaleo/shared/components/select';

import { ExtendedValuesType } from '../report-filters-selected-composite-filter/models/report-filters-selected-composite-filter.model';

@Injectable()
export class BaseReportFilterSelectClass {
    protected searchParams$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    public _formName: ReportFilterFilterEnum;

    public loading: boolean;

    public search(searchValue: string = '') {
        this.searchParams$.next(searchValue);
    }

    // TODO fix this for compareWithFnUtil
    compareWithFn(item: any, selected: any) {
        return compareWithFnUtil(item, selected, 'id');
        // const key = selected['id'] ? 'id' : 'code';
        // const selectedKey = typeof selected === 'object' ? selected[key] : selected;
        //
        // console.log(key, selected, selectedKey, selected['id']);
        // return item[key] === selectedKey;
    }

    public customSearchFn(term: string, item: ExtendedValuesType) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
