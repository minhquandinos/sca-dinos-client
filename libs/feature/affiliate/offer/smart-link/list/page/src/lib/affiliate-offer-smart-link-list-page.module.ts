import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateOfferSmartLinkListModule } from '@scaleo/feature/affiliate/offer/smart-link/list/component';

import { AffiliateSmartLinksComponent } from '../../../component/src/lib/affiliate-smart-links.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateSmartLinksComponent,
        data: {
            header: 'smart_link_page.title2'
        }
    }
];

@NgModule({
    imports: [CommonModule, AffiliateOfferSmartLinkListModule, RouterModule.forChild(routes)]
})
export class AffiliateOfferSmartLinkListPageModule {}
