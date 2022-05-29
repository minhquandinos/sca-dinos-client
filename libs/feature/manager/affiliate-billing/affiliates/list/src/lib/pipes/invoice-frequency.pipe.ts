import { Pipe, PipeTransform } from '@angular/core';

import { PAYMENTS_FREQUENCIES_TRANSLATE_MAP } from '../../../../../../../../platform/list/access-data/src/lib/constants/platform-list';
import { PaymentFrequencyIdEnum } from '../../../../../../../../platform/list/access-data/src/lib/enums/platform-list/payments-frequencies.enum';

@Pipe({
    name: 'invoiceFrequency'
})
export class InvoiceFrequencyPipe implements PipeTransform {
    transform(invoiceFrequency: PaymentFrequencyIdEnum): string {
        return PAYMENTS_FREQUENCIES_TRANSLATE_MAP[invoiceFrequency];
    }
}
