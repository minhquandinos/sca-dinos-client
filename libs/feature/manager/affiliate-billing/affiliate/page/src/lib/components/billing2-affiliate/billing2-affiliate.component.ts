import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AffiliateBillingBalanceWidgetComponent } from '@scaleo/affiliate-billing/balance/widget';
import { BillingAffiliatePaymentsMethodsComponent } from '@scaleo/affiliate-billing/payment-methods/widget/list';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailWidgetModel } from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { AffiliateInvoicesWidgetComponent } from '@scaleo/feature/manager/affiliate-billing/invoice/widgets/invoices/widget';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

type ReloadWidgetModel = {
    [key in ReloadWidgetType]: {
        reload(): void;
    };
};

type ReloadWidgetType = 'balance' | 'paymentMethods' | 'invoices';

@Component({
    selector: 'app-billing2-affiliate',
    templateUrl: './billing2-affiliate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class Billing2AffiliateComponent {
    readonly affiliateId: number;

    @ViewChild(AffiliateBillingBalanceWidgetComponent)
    private readonly affiliateBillingBalanceWidgetComponent: AffiliateBillingBalanceWidgetComponent;

    @ViewChild(BillingAffiliatePaymentsMethodsComponent)
    private readonly billingAffiliatePaymentsMethodsComponent: BillingAffiliatePaymentsMethodsComponent;

    @ViewChild(AffiliateInvoicesWidgetComponent)
    private readonly affiliateInvoicesWidgetComponent: AffiliateInvoicesWidgetComponent;

    readonly showPendingBalance$: Observable<boolean> = this.checkPermissionService.check$(this.permissions.canSeePendingConv);

    constructor(
        private unsubscribe: UnsubscribeService,
        private route: ActivatedRoute,
        private readonly pageTitleService: PageTitleService,
        private checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.affiliateId = this.getAffiliateId;
    }

    updatedWidget(widgets: ReloadWidgetType[]): void {
        const widgetMap: ReloadWidgetModel = {
            balance: this.affiliateBillingBalanceWidgetComponent,
            paymentMethods: this.billingAffiliatePaymentsMethodsComponent,
            invoices: this.affiliateInvoicesWidgetComponent
        };

        widgets.forEach((widget) => {
            widgetMap[widget].reload();
        });
    }

    setPageTitle(event: AffiliateDetailWidgetModel) {
        const pageTitle: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.affiliates',
                link: '/manager/billing/affiliates',
                current: false
            },
            {
                key: `#${this.affiliateId}`,
                title: event.company_name,
                link: null,
                current: true
            }
        ];
        this.pageTitleService.setTitle(pageTitle);
    }

    private get getAffiliateId(): number {
        return +this.route.snapshot.params.id;
    }
}
