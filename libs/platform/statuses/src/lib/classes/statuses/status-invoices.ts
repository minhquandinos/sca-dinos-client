import { INVOICE_STATUS_COLOR_MAP, INVOICE_STATUS_TRANSLATE_MAP, InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusInvoices implements StatusInterface {
    constructor(private status: InvoiceStatusNameEnum) {}

    makeColor(): string {
        const color = {
            ...INVOICE_STATUS_COLOR_MAP
        };
        return color[this.status];
    }

    makeLabel(): string {
        const label = INVOICE_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
