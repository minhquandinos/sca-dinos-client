import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerAdvertisersAccessPageGuard } from '@scaleo/feature/manager/advertiser/guards';
import { ManagerAdvertisersAccessPageService } from '@scaleo/feature/manager/advertiser/services';
import { MANAGER_NAVIGATION_PATH } from '@scaleo/feature/manager/core/navigation';

import { AdvertisersLayoutComponent } from './advertisers-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertisersLayoutComponent,
        data: {
            header: 'main_navigation.advertisers'
        },
        children: [
            {
                path: '',
                redirectTo: MANAGER_NAVIGATION_PATH.advertisers.list.all.routePath,
                pathMatch: 'full'
            },
            {
                path: MANAGER_NAVIGATION_PATH.advertisers.list.all.routePath,
                canLoad: [ManagerAdvertisersAccessPageGuard],
                canActivate: [ManagerAdvertisersAccessPageGuard],
                data: {
                    page: MANAGER_NAVIGATION_PATH.advertisers.list.all.routePath
                },
                loadChildren: () => import('@scaleo/feature/manager/advertiser/list/page').then((m) => m.AdvertisersModule)
            },
            {
                path: MANAGER_NAVIGATION_PATH.advertisers.list.my.routePath,
                canLoad: [ManagerAdvertisersAccessPageGuard],
                canActivate: [ManagerAdvertisersAccessPageGuard],
                data: {
                    page: MANAGER_NAVIGATION_PATH.advertisers.list.my.routePath
                },
                loadChildren: () => import('@scaleo/feature/manager/advertiser/list/page').then((m) => m.AdvertisersModule)
            },
            {
                path: MANAGER_NAVIGATION_PATH.advertisers.list.pending.routePath,
                canLoad: [ManagerAdvertisersAccessPageGuard],
                canActivate: [ManagerAdvertisersAccessPageGuard],
                data: {
                    page: MANAGER_NAVIGATION_PATH.advertisers.list.pending.routePath
                },
                loadChildren: () => import('@scaleo/feature/manager/advertiser/list/page').then((m) => m.AdvertisersModule)
            },
            {
                path: MANAGER_NAVIGATION_PATH.advertisers.detail.routePath,
                loadChildren: () =>
                    import('@scaleo/feature/manager/advertiser/detail/page').then((m) => m.ManagerAdvertiserDetailPageModuleModule)
            }
        ]
    }
];

@NgModule({
    declarations: [AdvertisersLayoutComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [ManagerAdvertisersAccessPageService, ManagerAdvertisersAccessPageGuard]
})
export class FeatureManagerAdvertiserPagesModule {}
