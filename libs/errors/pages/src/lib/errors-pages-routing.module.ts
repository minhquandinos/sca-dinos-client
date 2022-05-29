import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectGuard } from '@scaleo/platform/redirect';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { ErrorsPagesComponent } from './errors-pages.component';

const routes: Routes = [
    {
        path: '',
        component: ErrorsPagesComponent,
        children: [
            {
                path: '',
                component: ScaleoLayoutComponent,
                data: {
                    layout: ScaleoLayoutEnum.Empty
                },
                children: [
                    {
                        path: 'server-error',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/errors/server-error/page').then((modules) => modules.ErrorsServerErrorPageModule)
                    },
                    {
                        path: 'permission-denied',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/errors/permission-denied/page').then((modules) => modules.ErrorPermissionDeniedModule)
                    },
                    {
                        path: 'connection-lost',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/errors/connection-lost/page').then((modules) => modules.ErrorConnectionLostModule)
                    },
                    {
                        path: '**',
                        canActivate: [RedirectGuard],
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/errors/not-found/page').then((modules) => modules.ErrorNotFoundModule)
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorsPagesRoutingModule {}
