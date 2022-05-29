import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable } from 'rxjs';

import { Billing2InvoiceUpdateComponent } from '@scaleo/feature/manager/affiliate-billing/invoice/edit/modal-form';
import { Billing2InvoiceGenerateResponseModel } from '@scaleo/feature/manager/affiliate-billing/invoice/generate/data-access';
import { Billing2InvoiceGenerateComponent } from '@scaleo/feature/manager/affiliate-billing/invoice/generate/modal-form';
import { Billing2InvoiceUpdateRequestModel } from '@scaleo/invoice/common';
import type { Modal3CloseEvent } from '@scaleo/ui-kit/components/modal3';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Injectable()
export class ManagerBillingInvoiceUpsertModalService {
    constructor(private translate: TranslateService, private modal3: Modal3Service) {}

    generate(affiliateId?: number): Observable<Modal3CloseEvent<Billing2InvoiceGenerateResponseModel>> {
        return this.modal3
            .editForm(Billing2InvoiceGenerateComponent, {
                data: {
                    affiliateId
                }
            })
            .afterClosed$.pipe(filter(({ type }) => type === Modal3CloseEventEnum.Create));
    }

    update(id: number): Observable<Modal3CloseEvent<Billing2InvoiceUpdateRequestModel>> {
        return this.modal3
            .editForm(Billing2InvoiceUpdateComponent, {
                data: {
                    id
                }
            })
            .afterClosed$.pipe(
                filter(({ type }) => [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(type as Modal3CloseEventEnum))
            );
    }
}
