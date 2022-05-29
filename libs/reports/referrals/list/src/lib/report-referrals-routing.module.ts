import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportReferralListComponent } from './report-referral-list.component';

const routes: Routes = [
    {
        path: '',
        component: ReportReferralListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportReferralsRoutingModule {}
