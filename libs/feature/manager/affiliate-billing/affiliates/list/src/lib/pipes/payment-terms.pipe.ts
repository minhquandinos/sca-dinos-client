import { Pipe, PipeTransform } from '@angular/core';

import { INVOICES_PAYMENTS_TERMS_TRANSLATE_MAP, InvoicesPaymentsTermsIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'paymentTerms'
})
export class PaymentTermsPipe implements PipeTransform {
    transform(terms: InvoicesPaymentsTermsIdEnum): string {
        return INVOICES_PAYMENTS_TERMS_TRANSLATE_MAP[terms];
    }
}
