import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

const routes: Routes = [
    {
        path: '',
        component: ScaleoLayoutComponent,
        data: {
            layout: ScaleoLayoutEnum.Panel
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate2/dashboard/page').then((m) => m.FeatureAffiliate2DashboardPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class FeatureAffiliate2PagesModule {}
