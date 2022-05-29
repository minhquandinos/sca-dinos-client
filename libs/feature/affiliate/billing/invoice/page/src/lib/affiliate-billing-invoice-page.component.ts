import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_BILLING_INVOICE_DETAIL_PROVIDER,
    AffiliateBillingInvoiceDetailQuery,
    AffiliateBillingInvoiceDetailService
} from '@scaleo/feature/affiliate/billing/invoice/data-access';
import { InvoiceTransactionModel } from '@scaleo/invoice/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'scaleo-affiliate-billing-invoice-page',
    templateUrl: './affiliate-billing-invoice-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AFFILIATE_BILLING_INVOICE_DETAIL_PROVIDER, UnsubscribeService]
})
export class AffiliateBillingInvoicePageComponent implements OnInit {
    readonly id$ = this.affiliateBillingInvoiceDetailService.id$;

    info$ = this.affiliateBillingInvoiceDetailQuery.select('info');

    status$: Observable<InvoiceStatusNameEnum> = this.info$.pipe(pluck('status'));

    currency$: Observable<CurrencyEnum> = this.info$.pipe(pluck('currency'));

    transactions$: Observable<InvoiceTransactionModel> = this.affiliateBillingInvoiceDetailQuery.select('transaction');

    constructor(
        private readonly affiliateBillingInvoiceDetailQuery: AffiliateBillingInvoiceDetailQuery,
        private readonly affiliateBillingInvoiceDetailService: AffiliateBillingInvoiceDetailService,
        private readonly pageTitleService: PageTitleService,
        private readonly route: ActivatedRoute,
        private readonly unsubscribe: UnsubscribeService,
        private readonly router: Router,
        private readonly reportsClearTempFiltersService: ReportsClearTempFiltersService
    ) {
        const id = this.route.snapshot.params.id;
        this.affiliateBillingInvoiceDetailService.id = id;
    }

    ngOnInit(): void {
        this.affiliateBillingInvoiceDetailService
            .show()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((response) => {
                this.setHeader(response.invoice_number);
            });
    }

    private setHeader(title: string): void {
        const value: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.billing',
                link: `/affiliate/billing`,
                current: false
            },
            {
                key: null,
                title,
                link: null,
                current: true
            }
        ];
        this.pageTitleService.setTitle(value);
    }

    toReport(): void {
        const { id, start_date, end_date } = this.affiliateBillingInvoiceDetailQuery.getValue().info;
        this.reportsClearTempFiltersService.clearTempFilters();
        this.router.navigate(['/affiliate/transactions/conversions'], {
            queryParams: {
                [ReportFilterFilterEnum.AffiliateInvoice]: id,
                rangeFrom: start_date,
                rangeTo: end_date
            }
        });
    }
}
