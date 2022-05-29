import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';
import { UiFakeArrayPipeModule } from '@scaleo/ui-kit/pipes';

import { EmailTemplatesEditModule } from '../email-templates-edit/email-templates-edit.module';
import { EmailTemplatesListComponent } from './email-templates-list.component';

const routes = [
    {
        path: '',
        component: EmailTemplatesListComponent
    }
];

@NgModule({
    declarations: [EmailTemplatesListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        UiTableModule,
        UiSkeletonModule,
        EmailTemplatesEditModule,
        UiFakeArrayPipeModule
    ]
})
export class EmailTemplatesListModule {}
