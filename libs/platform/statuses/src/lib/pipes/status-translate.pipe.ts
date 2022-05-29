import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { PLATFORM_STATUSES_LIST_MAP, ScaleoStatusesType } from '@scaleo/platform/list/access-data';

/*
 * @deprecated
 * use other pipe StatusLabelPipe
 * */
@Pipe({
    name: 'statusTranslate'
})
export class StatusTranslatePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: string | number, status: keyof Record<ScaleoStatusesType, string>): Observable<string> {
        // TODO NX refactor any
        const list = (PLATFORM_STATUSES_LIST_MAP as any)?.[status];
        return list?.[value] ? this.translate.stream(list?.[value]) : EMPTY;
    }
}
