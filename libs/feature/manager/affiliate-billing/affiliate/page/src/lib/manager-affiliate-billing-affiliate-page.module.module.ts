import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateBillingBalanceWidgetModule } from '@scaleo/affiliate-billing/balance/widget';
import { BillingAffiliatePaymentsMethodsModule } from '@scaleo/affiliate-billing/payment-methods/widget/list';
import { SharedModule } from '@scaleo/core/shared/module';
import { AFFILIATE_DETAIL_PAGE_TYPE } from '@scaleo/feature/manager/affiliate/detail/detail-widget/common';
import { ManagerAffiliateDetailInfoWidgetComponentModule } from '@scaleo/feature/manager/affiliate/detail/detail-widget/component';
import { AffiliateInvoicesWidgetModule } from '@scaleo/feature/manager/affiliate-billing/invoice/widgets/invoices/widget';
import { StickyModule } from '@scaleo/shared/directives';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { Billing2AffiliateComponent } from './components/billing2-affiliate/billing2-affiliate.component';

const routes: Routes = [
    {
        path: '',
        component: Billing2AffiliateComponent,
        data: {
            affiliateDetailPageType: AFFILIATE_DETAIL_PAGE_TYPE.billingDetail
        }
    }
];

@NgModule({
    declarations: [Billing2AffiliateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ManagerAffiliateDetailInfoWidgetComponentModule,
        UiPageWrapperModule,
        FlexLayoutModule,
        BillingAffiliatePaymentsMethodsModule,
        FlexLayoutModule,
        AffiliateInvoicesWidgetModule,
        AffiliateBillingBalanceWidgetModule,
        StickyModule,
        CustomFlexModule,
        SharedModule
    ]
})
export class ManagerAffiliateBillingAffiliatePageModuleModule {}
