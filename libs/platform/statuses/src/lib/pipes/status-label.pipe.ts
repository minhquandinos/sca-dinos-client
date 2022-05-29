import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { ScaleoStatusesType } from '@scaleo/platform/list/access-data';

import { statusColor2Creator } from '../const/status-color2.const';

@Pipe({
    name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: string | number, type: keyof Record<ScaleoStatusesType, string>): Observable<string> {
        const status = statusColor2Creator(type, value);
        const label = status?.makeLabel();

        return label ? this.translate.stream(label) : EMPTY;
    }
}
