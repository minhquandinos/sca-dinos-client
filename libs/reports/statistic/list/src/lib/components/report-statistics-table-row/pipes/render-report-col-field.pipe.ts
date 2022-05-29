import { Pipe, PipeTransform } from '@angular/core';

import { StatisticModel } from '@scaleo/reports/common';
import { ReportFieldsMap } from '@scaleo/reports/shared/format-fields';

@Pipe({
    name: 'renderReportColField'
})
export class RenderReportColFieldPipe implements PipeTransform {
    transform(item: StatisticModel, key: string): boolean {
        const realKey = this.realKey(key);
        return !!item[realKey] || (item[realKey] !== null && +item[realKey] === 0);
    }

    realKey(key: string): string {
        return ReportFieldsMap.getKeyField(key);
    }

    test(): boolean {
        return false;
    }
}
