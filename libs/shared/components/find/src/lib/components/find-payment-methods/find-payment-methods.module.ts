import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindPaymentMethodsComponent } from './find-payment-methods.component';

@NgModule({
    declarations: [FindPaymentMethodsComponent],
    exports: [FindPaymentMethodsComponent],
    imports: [CommonModule, SelectModule, SharedModule]
})
export class FindPaymentMethodsModule {}
