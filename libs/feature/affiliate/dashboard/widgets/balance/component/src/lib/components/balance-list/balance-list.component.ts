import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RecentInvoiceModel } from '@scaleo/feature-affiliate-dashboard-widgets-balance-data-access';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-balance-list',
    templateUrl: './balance-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceListComponent {
    @Input() invoices: RecentInvoiceModel[] = [];

    @Input() isLoad = false;

    readonly headers: UiSimpleTableHeaderModel[] = [
        {
            value: 'date',
            translateSchema: 'table.column.date',
            width: '40%'
        },
        {
            value: 'status',
            translateSchema: 'table.column.status',
            width: '30%'
        },
        {
            value: 'amount',
            translateSchema: 'table.column.amount',
            width: '30%'
        }
    ];

    constructor() {}

    trackByFn(index: number, item: UiSimpleTableHeaderModel) {
        return item.value || index;
    }

    invoiceTrackByFn(index: number, item: RecentInvoiceModel) {
        return item.id || index;
    }
}
