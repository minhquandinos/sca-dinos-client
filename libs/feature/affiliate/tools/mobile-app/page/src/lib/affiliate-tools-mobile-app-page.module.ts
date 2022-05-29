import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MobileAppViewDeepLinkComponent, MobileAppViewDeepLinkModule } from '@scaleo/feature/shared/mobile-app/view-deep-link';

const routes: Routes = [
    {
        path: '',
        component: MobileAppViewDeepLinkComponent
    }
];

@NgModule({
    imports: [CommonModule, MobileAppViewDeepLinkModule, RouterModule.forChild(routes)]
})
export class AffiliateToolsMobileAppPageModule {}
