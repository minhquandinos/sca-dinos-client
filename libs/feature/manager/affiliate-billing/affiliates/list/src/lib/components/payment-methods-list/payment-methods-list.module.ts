import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { PaymentMethodDetailModule } from '../../../../../../../../../affiliate-billing/payment-methods/detail/src/lib/payment-method-detail.module';
import { TruncateTextPipeModule } from '../../../../../../../../../shared/pipes/src/lib/truncate-text/truncate-text-pipe.module';
import { UiSvgIconModule } from '../../../../../../../../../ui-kit/elements/src/lib/ui-svg-icon/ui-svg-icon.module';
import { PaymentMethodsListComponent } from './payment-methods-list.component';

@NgModule({
    declarations: [PaymentMethodsListComponent],
    exports: [PaymentMethodsListComponent],
    imports: [CommonModule, PaymentMethodDetailModule, UiSvgIconModule, SharedModule, TruncateTextPipeModule]
})
export class PaymentMethodsListModule {}
