import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GettingStartedPagesComponent } from './getting-started-pages.component';

const routes: Routes = [
    {
        path: '',
        component: GettingStartedPagesComponent,
        data: {
            header: 'main_navigation.getting-started'
        },
        children: [
            {
                path: '',
                redirectTo: 'account',
                pathMatch: 'full'
            },
            {
                path: 'account',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/getting-started/account/page').then((m) => m.ManagerGettingStartedAccountPageModule)
            },
            {
                path: 'branding',
                data: {
                    gettingStarted: true
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/getting-started/branding/page').then((m) => m.GettingStartedBrandingPageModule)
            },
            {
                path: 'create-an-offer',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/getting-started/create-item/page').then(
                        (m) => m.ManagerGettingStartedCreateItemPageModule
                    ),
                data: {
                    item: 'offer'
                }
            },
            {
                path: 'create-an-affiliate',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/getting-started/create-item/page').then(
                        (m) => m.ManagerGettingStartedCreateItemPageModule
                    ),
                data: {
                    item: 'affiliate'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerGettingStartedPagesRoutingModule {}
