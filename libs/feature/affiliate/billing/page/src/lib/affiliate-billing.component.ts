import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { map, Observable, pluck, zip } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BillingPreferencesFieldEnum, billingPreferencesFields } from '@scaleo/affiliate-billing/preferences/filds-view';
import { AffiliateAccessInvoicesWidgetComponent } from '@scaleo/feature/affiliate/billing/widgets/invoices/list';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-affiliate-billing',
    templateUrl: './affiliate-billing.component.html'
})
export class AffiliateBillingComponent implements OnInit {
    showBalanceForPendingConversion: boolean;

    paymentType: AffiliateInvoiceFrequencyEnum;

    affPaymentInfo: string;

    showAlert: boolean;

    readonly affiliateId$ = this.profileQuery.id$;

    readonly preferencesFields = billingPreferencesFields([BillingPreferencesFieldEnum.GenerationInvoice]);

    @ViewChild(AffiliateAccessInvoicesWidgetComponent)
    readonly affiliateAccessInvoicesWidgetComponent: AffiliateAccessInvoicesWidgetComponent;

    private readonly showAlertLocalStorageKey = 'affiliate_billing_alert';

    readonly showPendingBalance$: Observable<boolean> = zip([
        this.platformSettingsQuery.settings$.pipe(pluck('show_the_balance_of_pending_conversions')),
        this.checkPermissionService.check$(this.permissions.canSeePendingConv)
    ]).pipe(map(([settingsConv, permissionConv]) => settingsConv && permissionConv));

    constructor(
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly checkPermissionService: CheckPermissionService,
        private readonly profileQuery: ProfileQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.initSettings();
        this.checkShowBillingAlert();
    }

    close(): void {
        localStorage.setItem(this.showAlertLocalStorageKey, JSON.stringify(false));
        this.showAlert = false;
    }

    requestSended(): void {
        this.affiliateAccessInvoicesWidgetComponent.reloadItems();
    }

    private initSettings(): void {
        const { settings } = this.platformSettingsQuery;
        this.paymentType = this.platformSettingsQuery.settings.invoice_type;

        this.showBalanceForPendingConversion =
            settings.show_the_balance_of_pending_conversions && !this.checkPermissionService.check(this.permissions.canSeePendingConv);
        this.affPaymentInfo = this.platformSettingsQuery.settings.information_for_affiliates;
    }

    private checkShowBillingAlert(): void {
        this.showAlert = JSON.parse(localStorage.getItem(this.showAlertLocalStorageKey)) !== false;
    }
}
