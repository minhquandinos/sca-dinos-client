import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
    name: 'affiliateBillingInvoiceGenerationName'
})
export class AffiliateBillingInvoiceGenerationNamePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(value: boolean): Observable<string> {
        const type = value ? 'automatically' : 'manually';
        const schema = `invoice.settings.generation.${type}`;

        return this.translate.stream(schema);
    }
}
