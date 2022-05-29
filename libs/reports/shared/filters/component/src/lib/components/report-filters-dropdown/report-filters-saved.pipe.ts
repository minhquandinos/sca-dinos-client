import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

import { ReportFilterQuery } from '../../state/report-filter.query';

@Pipe({
    name: 'reportFiltersSaved'
})
export class ReportFiltersSaveddPipe implements PipeTransform {
    constructor(private reportFilterQuery: ReportFilterQuery) {}

    transform(value: ReportFilterFilterEnum): Observable<boolean> {
        return this.reportFilterQuery
            .select('selectedList')
            .pipe(map((filters) => filters?.some((filter) => filter.filter === value && filter.isSaved)));
    }
}
