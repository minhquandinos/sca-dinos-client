import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AffiliateBillingBalanceComponent } from '../affiliate-billing-balance.component';

@Directive({
    selector: '[appShowPendingBalanceBlock]'
})
export class ShowPendingBalanceBlockDirective implements AfterViewInit {
    @Input('appShowPendingBalanceBlock')
    showPendingBalance: boolean;

    private hasView = false;

    constructor(
        private readonly parentHost: AffiliateBillingBalanceComponent,
        private readonly host: ElementRef,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {
        this.render();
    }

    private render(): void {
        if (!this.hasView && this.renderFactory) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
            this.cdr.detectChanges();
        }
    }

    private get renderFactory(): boolean {
        if (this.showPendingBalance !== undefined) {
            return this.renderOfPageWidth && this.showPendingBalance;
        }

        return this.renderOfPageWidth;

        // const { aff_hide_pending_and_rejected_transactions: prt, show_the_balance_of_pending_conversions: bpc } =
        //     this.settingsQuery.settings;
        // return (this.renderOfPageWidth && bpc && !prt) || (!this.renderOfPageWidth && bpc && prt);

        // switch (this.profile.role) {
        //     case RoleEnum.Affiliate:
        //         return (this.renderOfPageWidth && bpc && !prt) || (!this.renderOfPageWidth && bpc && prt);
        //     case RoleEnum.Admin:
        //     case RoleEnum.Manager:
        //         return this.renderOfPageWidth && bpc;
        //     case RoleEnum.LimitedAffiliateManager:
        //         return bpc;
        //     default:
        //         return false;
        // }
    }

    private get renderOfPageWidth(): boolean {
        const wrapperContentWidth = this.parentHost.host.nativeElement.offsetWidth;
        const affiliateBillingContainerWidth = this.parentHost.affiliateBillingContainerRef.nativeElement.offsetWidth;

        return wrapperContentWidth >= affiliateBillingContainerWidth;
    }
}
