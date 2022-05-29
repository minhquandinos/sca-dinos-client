import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { MobileAppToolGuard } from '@scaleo/feature/shared/mobile-app/guards';
import { StickyModule } from '@scaleo/shared/directives';
import { SidenavModule } from '@scaleo/ui-kit/elements';

import { AdvertiserToolsLayoutComponent } from './advertiser-tools-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AdvertiserToolsLayoutComponent,
        data: {
            header: 'main_navigation.tools'
        },
        children: [
            {
                path: '',
                redirectTo: 'mobile-app'
            },
            {
                path: 'mobile-app',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/advertiser/tools/mobile-app/page').then((m) => m.AdvertiserToolsMobileAppPageModule),
                canActivate: [MobileAppToolGuard]
            }
        ]
    }
];

@NgModule({
    declarations: [AdvertiserToolsLayoutComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FlexModule, SidenavModule, StickyModule]
})
export class AdvertiserToolsPagesModule {}
