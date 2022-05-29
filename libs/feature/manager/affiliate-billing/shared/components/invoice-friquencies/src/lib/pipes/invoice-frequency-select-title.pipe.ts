import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { PaymentFrequencyIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'invoiceFrequencySelectTitle'
})
export class InvoiceFrequencySelectTitlePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(type: PaymentFrequencyIdEnum): Observable<string> {
        const schemaTpl = `interface.date.{daysOf}.title`;
        const name = type === PaymentFrequencyIdEnum.Weekly ? 'week' : 'month';
        return this.translate.stream(schemaTpl.replace('{daysOf}', name));
    }
}
