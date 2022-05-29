import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { SettingsCardModule, SettingsCardService } from '@scaleo/feature/manager/settings/shared';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { BillingComponent } from './billing.component';

const router = [
    {
        path: '',
        component: BillingComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'affiliate'
            },
            {
                path: 'affiliate',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/billing/affiliate/page').then(
                        (m) => m.ManagerSettingsBillingAffiliatePageModule
                    )
            },
            {
                path: 'payment-methods',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/billing/payment-methods/page').then((m) => m.PaymentMethodsModule)
            }
        ]
    }
];

@NgModule({
    declarations: [BillingComponent],
    imports: [CommonModule, SettingsCardModule, UiButtonLinkModule, SharedModule, RouterModule.forChild(router)],
    providers: [SettingsCardService]
})
export class ManagerSettingsBillingPagesModule {}
