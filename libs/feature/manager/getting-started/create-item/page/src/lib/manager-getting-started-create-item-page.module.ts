import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CardModule, UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { StepCreateFirstItemComponent } from './step-create-first-item.component';

const routes: Routes = [
    {
        path: '',
        component: StepCreateFirstItemComponent
    }
];

@NgModule({
    declarations: [StepCreateFirstItemComponent],
    imports: [CommonModule, CardModule, SharedModule, RouterModule.forChild(routes), UiBrModule, UiButtonLinkModule]
})
export class ManagerGettingStartedCreateItemPageModule {}
