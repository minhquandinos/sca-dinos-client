import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { RadioModule, TextareaModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { DefaultImageModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiImageModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { AffiliatePaymentMethodsUpsertComponent } from './affiliate-payment-methods-upsert.component';
import { AffiliatePaymentMethodInfoComponent } from './components/affiliate-payment-method-info/affiliate-payment-method-info.component';

@NgModule({
    declarations: [AffiliatePaymentMethodsUpsertComponent, AffiliatePaymentMethodInfoComponent],
    imports: [
        CommonModule,
        SharedModule,
        FindPlatformListModule,
        UiSkeletonModule,
        RadioModule,
        PlatformFormatPipeModule,
        UiImageModule,
        TextareaModule,
        UiButtonLinkModule,
        DefaultImageModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class AffiliatePaymentMethodsUpsertModule {}
