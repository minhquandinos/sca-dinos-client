import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DefaultImageModule, TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiImageModule } from '@scaleo/ui-kit/elements';

import { PaymentMethodDetailComponent } from './payment-method-detail.component';

@NgModule({
    declarations: [PaymentMethodDetailComponent],
    imports: [CommonModule, SharedModule, UiImageModule, DefaultImageModule, TruncateTextPipeModule],
    exports: [PaymentMethodDetailComponent]
})
export class PaymentMethodDetailModule {}
