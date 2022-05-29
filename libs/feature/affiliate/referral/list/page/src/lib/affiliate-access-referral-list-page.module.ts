import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateReferralsComponent, AffiliateReferralsModule } from '@scaleo/feature/affiliate/referral/list/component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateReferralsComponent
    }
];

@NgModule({
    imports: [CommonModule, AffiliateReferralsModule, RouterModule.forChild(routes)]
})
export class AffiliateAccessReferralListPageModule {}
