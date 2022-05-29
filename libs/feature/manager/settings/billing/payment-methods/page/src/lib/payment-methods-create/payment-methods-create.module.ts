import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomImageCropperModule, FormLogoModule, InputModule } from '@scaleo/shared/components';
import { FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiImageModule, UiPageWrapperModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { PaymentMethodsCreateComponent } from './payment-methods-create.component';

@NgModule({
    declarations: [PaymentMethodsCreateComponent],
    imports: [
        UiPageWrapperModule,
        UiButtonLinkModule,
        SharedModule,
        InputModule,
        UiSkeletonModule,
        FormLogoModule,
        CustomImageCropperModule,
        UiImageModule,
        FindPlatformListModule,
        FindPlatformStatusesModule,
        Modal3EditFormModule,
        SelectModule
    ],
    exports: [PaymentMethodsCreateComponent]
})
export class PaymentMethodsCreateModule {}
