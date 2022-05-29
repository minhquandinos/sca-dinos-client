import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { UiDividerModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { EmailTemplatesComponent } from './email-templates.component';

const routes = [
    {
        path: '',
        component: EmailTemplatesComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general'
            },
            {
                path: 'general',
                data: {
                    emailType: 'general'
                },
                loadChildren: (): Promise<any> =>
                    import('./components/email-templates-list/email-templates-list.module').then((m) => m.EmailTemplatesListModule)
            },
            {
                path: 'signup',
                data: {
                    emailType: 'signup'
                },
                loadChildren: (): Promise<any> =>
                    import('./components/email-templates-list/email-templates-list.module').then((m) => m.EmailTemplatesListModule)
            },
            {
                path: 'offers',
                data: {
                    emailType: 'offers'
                },
                loadChildren: (): Promise<any> =>
                    import('./components/email-templates-list/email-templates-list.module').then((m) => m.EmailTemplatesListModule)
            }
        ]
    }
];

@NgModule({
    declarations: [EmailTemplatesComponent],
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule, UiCard2Module, UiDividerModule, UiTabNavBarModule],
    exports: [EmailTemplatesComponent]
})
export class ManagerSettingsEmailTemplatesPagesModule {}
