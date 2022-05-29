import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidenavModule } from '@scaleo/ui-kit/elements';

import { ManagerSettingsLayoutComponent } from './manager-settings-layout.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerSettingsLayoutComponent,
        data: {
            header: 'main_navigation.settings'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general'
            },
            {
                path: 'general',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/general/page').then((m) => m.ManagerSettingsGeneralPageModule)
            },
            {
                path: 'branding',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/branding/page').then((m) => m.ManagerSettingsBrandingPageModule)
            },
            {
                path: 'offers',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/offers/page').then((m) => m.ManagerSettingsOffersPageModule)
            },
            {
                path: 'affiliates',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/affiliates/page').then((m) => m.ManagerSettingsAffiliatesPageModule)
            },
            {
                path: 'advertisers',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/advertisers/page').then((m) => m.ManagerSettingsAdvertisersPageModule)
            },
            {
                path: 'billing',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/billing/pages').then((m) => m.ManagerSettingsBillingPagesModule)
            },
            {
                path: 'lists',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/lists/pages').then((m) => m.ManagerSettingsListsPagesModule)
            },
            {
                path: 'email-templates',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/email-templates/pages').then((m) => m.ManagerSettingsEmailTemplatesPagesModule)
            },
            {
                path: 'security',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/security/page').then((m) => m.ManagerSettingsSecurityPageModule)
            },
            {
                path: 'mobile-app',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/mobile-app/page').then((m) => m.ManagerSettingsMobileAppPageModule)
            },
            {
                path: 'roles-permissions',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature-manager-settings-role-list-page').then((m) => m.ManagerSettingsPermissionPageModule)
            },
            {
                path: 'teammates',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/settings/teammate/list/page').then((m) => m.ManagerSettingsTeammateListPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, SidenavModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerSettingsPagesRoutingModule {}
