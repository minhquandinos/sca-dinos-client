import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ManagerAffiliateReferralsComponent,
    ManagerAffiliateReferralsModule
} from '@scaleo/feature/manager/affiliate/referral/list/component';

const routes: Routes = [
    {
        path: '',
        component: ManagerAffiliateReferralsComponent
    }
];

@NgModule({
    imports: [CommonModule, ManagerAffiliateReferralsModule, RouterModule.forChild(routes)]
})
export class ManagerAffiliateReferralListPageModule {}
