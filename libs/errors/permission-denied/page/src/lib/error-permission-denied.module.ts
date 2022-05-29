import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ErrorPermissionDeniedComponent } from './error-permission-denied.component';

const routes: Routes = [
    {
        path: '',
        component: ErrorPermissionDeniedComponent
    }
];

@NgModule({
    declarations: [ErrorPermissionDeniedComponent],
    imports: [CommonModule, SharedModule, UiPageWrapperModule, RouterModule.forChild(routes), UiButtonLinkModule],
    exports: [ErrorPermissionDeniedComponent]
})
export class ErrorPermissionDeniedModule {}
