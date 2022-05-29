import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { InvoiceStatusNameEnum, InvoiceStatusTranslateEnum } from '@scaleo/platform/list/access-data';
import { DropDownMenuInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-affiliate-invoice-multi-change-status',
    template: `
        <ui-old-dropdown-menu
            [icon]="'down-white'"
            dropMenuPosition="right"
            buttonType="main-floating"
            [label]="'interface.basic.change_status' | translate"
            [elements]="menus"
            className="report-conversions__dropdown-menu mr-3"
        ></ui-old-dropdown-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateInvoiceMultiChangeStatusComponent {
    readonly menus: DropDownMenuInterface[] = [
        {
            title: InvoiceStatusTranslateEnum.Draft,
            action: (): any => this.changeStatus(InvoiceStatusNameEnum.Draft)
        },
        {
            title: InvoiceStatusTranslateEnum.Unpaid,
            action: (): any => this.changeStatus(InvoiceStatusNameEnum.Unpaid)
        },
        {
            title: InvoiceStatusTranslateEnum.Paid,
            action: (): any => this.changeStatus(InvoiceStatusNameEnum.Paid)
        }
    ];

    @Output() changedStatus: EventEmitter<InvoiceStatusNameEnum> = new EventEmitter<InvoiceStatusNameEnum>();

    private changeStatus(status: InvoiceStatusNameEnum) {
        this.changedStatus.emit(status);
    }
}
