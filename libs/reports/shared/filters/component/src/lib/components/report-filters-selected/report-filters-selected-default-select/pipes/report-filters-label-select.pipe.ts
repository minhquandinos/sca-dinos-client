import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { CONVERSION_STATUS_TRANSLATE_MAP } from '@scaleo/platform/list/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

@Pipe({
    name: 'reportFiltersLabelSelectPipe'
})
export class ReportFiltersLabelSelectPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    public transform(item: any, filterType: ReportFilterFilterEnum): Observable<string> {
        let labelKey: string;
        let translateKey: string;
        switch (filterType) {
            case ReportFilterFilterEnum.Reason:
            case ReportFilterFilterEnum.Redirection:
                labelKey = `title_${this.translate.currentLang}`;
                break;
            case ReportFilterFilterEnum.ConversionStatus:
                translateKey = item?.['id'] ? CONVERSION_STATUS_TRANSLATE_MAP[item?.['id']] : undefined;
                break;
            default:
                labelKey = 'title';
                break;
        }

        if (translateKey) {
            return this.translate.stream(translateKey);
        }

        return of(item[labelKey]);
    }
}
