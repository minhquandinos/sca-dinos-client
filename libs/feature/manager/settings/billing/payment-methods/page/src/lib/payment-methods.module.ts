import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiButtonLinkModule, UiSkeletonModule, UiStatusColorModule, UiSvgIconModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { PaymentMethodsComponent } from './payment-methods.component';
import { PaymentMethodsCreateModule } from './payment-methods-create/payment-methods-create.module';

const router = [
    {
        path: '',
        component: PaymentMethodsComponent
    }
];

@NgModule({
    declarations: [PaymentMethodsComponent],
    imports: [
        RouterModule.forChild(router),
        SortablejsModule.forRoot({ animation: 150 }),
        UiTableModule,
        UiSvgIconModule,
        UiStatusColorModule,
        UiSkeletonModule,
        PlatformFormatPipeModule,
        SharedModule,
        UiButtonLinkModule,
        PaymentMethodsCreateModule
    ],
    providers: [],
    exports: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
