import { Pipe, PipeTransform } from '@angular/core';

import { InvoiceTransactionTypeEnum } from '../../../enums/invoice-transaction.enum';

@Pipe({
    name: 'invoiceTransactionType'
})
export class InvoiceTransactionTypePipe implements PipeTransform {
    transform(value: InvoiceTransactionTypeEnum): string {
        const translate = {
            [InvoiceTransactionTypeEnum.Click]: 'interface.basic.click',
            [InvoiceTransactionTypeEnum.Conversion]: 'interface.basic.conversion_short_title'
        };
        return translate[value];
    }
}
