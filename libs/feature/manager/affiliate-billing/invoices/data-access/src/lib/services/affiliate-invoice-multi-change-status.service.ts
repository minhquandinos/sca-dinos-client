import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { defer, Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ManagerBillingInvoiceConfirmChangeStatusService } from '@scaleo/feature/manager/affiliate-billing/common';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { Modal3CloseEventEnum } from '@scaleo/ui-kit/components/modal3';
import { ArrayUtil } from '@scaleo/utils';

import { Billing2InvoicesApi } from '../api/billing2-invoices.api';

@Injectable()
export class AffiliateInvoiceMultiChangeStatusService {
    constructor(
        private readonly translate: TranslateService,
        private readonly api: Billing2InvoicesApi,
        private readonly confirmChangeStatus: ManagerBillingInvoiceConfirmChangeStatusService
    ) {}

    change(selectedRows: number[], newStatus: InvoiceStatusNameEnum, showConfirm: boolean = false): Observable<void> {
        return defer(() =>
            showConfirm ? this.confirmChangeStatus.confirm().pipe(filter(({ type }) => type === Modal3CloseEventEnum.Confirm)) : of(true)
        ).pipe(
            switchMap(() =>
                this.api.multipleChangeStatus({
                    invoices: ArrayUtil.join(selectedRows),
                    new_status: newStatus
                })
            )
        );
    }
}
