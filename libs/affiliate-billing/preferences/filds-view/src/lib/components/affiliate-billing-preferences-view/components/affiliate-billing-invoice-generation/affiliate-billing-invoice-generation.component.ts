import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-affiliate-billing-invoice-generation',
    templateUrl: './affiliate-billing-invoice-generation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingInvoiceGenerationComponent {
    @Input() automatically: boolean;

    type$: Observable<AffiliateInvoiceFrequencyEnum> = this.platformSettingsQuery.settings$.pipe(pluck('invoice_type'));

    byAffiliateRequest$ = this.type$.pipe(map((type) => type === AffiliateInvoiceFrequencyEnum.ByAffiliateRequest));

    bySchedule$ = this.type$.pipe(map((type) => type === AffiliateInvoiceFrequencyEnum.BySchedule));

    constructor(private platformSettingsQuery: PlatformSettingsQuery) {}
}
