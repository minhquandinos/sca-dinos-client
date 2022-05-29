import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@scaleo/auth/guards';

const routes: Routes = [
    /**
     * Feature pages
     */

    {
        path: '',
        loadChildren: (): Promise<any> => import('@scaleo/feature/account/pages').then((m) => m.AccountPagesModule),
        canActivate: [AuthGuard], // ProfileGuard
        canActivateChild: [AuthGuard], // ProfileGuard
        data: {
            preload: true
        }
    },

    /**
     * Auth pages
     */
    {
        path: '',
        loadChildren: (): Promise<any> => import('@scaleo/feature/auth/pages').then((m) => m.AuthPagesModule),
        data: {
            preload: true
        }
    },

    /**
     * Error pages
     */
    {
        path: '',
        loadChildren: (): Promise<any> => import('@scaleo/errors/pages').then((modules) => modules.ErrorsPagesModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload',
            relativeLinkResolution: 'legacy'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
