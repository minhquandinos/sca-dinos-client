import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerOfferSmartLinkListModule, SmartLinksComponent } from '@scaleo/feature/manager/offer/smart-link/list/component';
import { OfferSmartLinkNotifyUpgradePlanModule, SmartLinkNotifyUpgradePlanComponent } from '@scaleo/offer/smart-link/notify-upgrade-plan';

const routes: Routes = [
    {
        path: '',
        component: SmartLinkNotifyUpgradePlanComponent,
        outlet: 'upgrade'
    },
    {
        path: '',
        component: SmartLinksComponent,
        data: {
            header: 'smart_link_page.title2'
        }
    }
];

@NgModule({
    imports: [CommonModule, ManagerOfferSmartLinkListModule, OfferSmartLinkNotifyUpgradePlanModule, RouterModule.forChild(routes)]
})
export class ManagerOfferSmartLinkListPageModule {}
