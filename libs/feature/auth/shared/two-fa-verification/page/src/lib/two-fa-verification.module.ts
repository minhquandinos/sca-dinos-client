import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ErrorsModule, InputModule } from '@scaleo/shared/components';
import { DebounceClickDirectiveModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { TwoFaVerificationComponent } from './two-fa-verification.component';

const routes: Routes = [
    {
        path: '',
        component: TwoFaVerificationComponent
    }
];

@NgModule({
    declarations: [TwoFaVerificationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiButtonLinkModule,
        TranslateModule,
        SharedModule,
        InputModule,
        DebounceClickDirectiveModule,
        ErrorsModule
    ]
})
export class TwoFaVerificationModule {}
