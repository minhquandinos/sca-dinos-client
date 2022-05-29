import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-billing2-invoice-link-to-detail',
    template: `
        <ng-container *ngIf="status !== invoiceStatusNameEnum.InProgress; else defaultTpl">
            <a [routerLink]="link" class="text-nowrap">{{ invoice }}</a>
            <app-invoice-download class="invoice-download d-flex align-items-center" place="list" [invoice]="id"></app-invoice-download>
        </ng-container>
        <ng-template #defaultTpl>
            <span>{{ invoice }}</span>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceLinkToDetailComponent {
    @HostBinding('class') hostClass = 'd-flex align-items-center w-100';

    @Input()
    status: InvoiceStatusNameEnum;

    @Input()
    link: string;

    @Input()
    id: number;

    @Input()
    invoice: string;

    readonly invoiceStatusNameEnum = InvoiceStatusNameEnum;
}
