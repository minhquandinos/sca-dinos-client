import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MANAGER_NAVIGATION_PATH } from '@scaleo/feature/manager/core/navigation';

const routes: Routes = [
    {
        path: '',
        data: {
            header: 'main_navigation.affiliates'
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate/list/page').then((m) => m.ManagerAffiliateListPageModule)
    },
    {
        path: MANAGER_NAVIGATION_PATH.affiliates.detail.routePath,
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate/detail/page').then((m) => m.ManagerAffiliateDetailPageModule)
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ManagerAffiliatePagesModule {}
