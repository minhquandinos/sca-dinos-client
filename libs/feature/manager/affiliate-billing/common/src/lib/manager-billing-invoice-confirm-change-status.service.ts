import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { Modal3CloseEvent, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Injectable()
export class ManagerBillingInvoiceConfirmChangeStatusService {
    constructor(private modal3Service: Modal3Service, private translate: TranslateService) {}

    confirm(): Observable<Modal3CloseEvent<null>> {
        return this.modal3Service.confirm(this.translate.instant('invoice.update.confirm_paid_status'), {
            title: this.translate.instant('confirm_message.are_you_sure'),
            actionLabel: this.translate.instant('interface.basic.continue'),
            typeButton: 'main'
        }).afterClosed$;
    }
}
