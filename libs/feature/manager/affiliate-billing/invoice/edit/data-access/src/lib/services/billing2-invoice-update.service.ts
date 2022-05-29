import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Billing2InvoiceUpdateRequestModel, Billing2InvoiceUpdateResponseModel } from '@scaleo/invoice/common';

import { Billing2InvoiceUpdateApi } from '../api/billing2-invoice-update.api';

@Injectable()
export class Billing2InvoiceUpdateService {
    constructor(private api: Billing2InvoiceUpdateApi) {}

    show(id: number) {
        return this.api.show(id);
    }

    update(id: number, payload: Billing2InvoiceUpdateRequestModel): Promise<Billing2InvoiceUpdateResponseModel> {
        if (Object.prototype.hasOwnProperty.call(payload, 'attachment')) {
            delete (payload as any)?.['attachment'];
        }
        return firstValueFrom(this.api.update(id, payload));
    }

    destroy(id: number): Promise<unknown> {
        return firstValueFrom(this.api.destroy(id));
    }

    deleteAttachment(id: number): Promise<unknown> {
        return firstValueFrom(this.api.deleteAttachment(id));
    }
}
