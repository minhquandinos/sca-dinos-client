import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateAccessInvoicesWidgetProvider } from '@scaleo/feature/affiliate/billing/widgets/invoices/data-access';

import { AffiliateInvoicesListComponent } from '../../affiliate-invoices-list/affiliate-invoices-list.component';

@Component({
    selector: 'app-affiliate-access-invoices-widget',
    template: `
        <app-affiliate-invoices-list>
            <div header="" class="title">{{ 'invoice.invoices_title' | translate }}</div>
        </app-affiliate-invoices-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, AffiliateAccessInvoicesWidgetProvider]
})
export class AffiliateAccessInvoicesWidgetComponent {
    @ViewChild(AffiliateInvoicesListComponent)
    readonly affiliateInvoicesListComponent: AffiliateInvoicesListComponent;

    reloadItems(): void {
        this.affiliateInvoicesListComponent.reloadItems();
    }
}
