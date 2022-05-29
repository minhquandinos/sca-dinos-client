import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ConnectionLostComponent } from './connection-lost.component';

const routes: Routes = [
    {
        path: '',
        component: ConnectionLostComponent
    }
];

@NgModule({
    declarations: [ConnectionLostComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes), UiButtonLinkModule]
})
export class ErrorConnectionLostModule {}
