import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ArrayUtil } from '@scaleo/utils';

import { Billing2InvoicesApi } from '../api/billing2-invoices.api';

@Injectable()
export class MultiDeleteAffiliateInvoiceService {
    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly translate: TranslateService,
        private readonly api: Billing2InvoicesApi
    ) {}

    multipleDelete(selectedRows: number[]): Observable<void> {
        return this.modal3Service
            .confirm(this.translate.instant('invoice.multi_delete.confirm.message'), {
                title: this.translate.instant('interface.confirm.title'),
                actionLabel: this.translate.instant('interface.basic.continue'),
                typeButton: 'main'
            })
            .afterClosed$.pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.api.multipleDelete({ invoices: ArrayUtil.join(selectedRows) }))
            );
    }
}
