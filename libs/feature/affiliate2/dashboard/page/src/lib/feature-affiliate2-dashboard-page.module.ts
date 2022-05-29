import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { FeatureAffiliate2DashboardPageComponent } from './feature-affiliate2-dashboard-page.component';

const dashboardRouter = [
    {
        path: '',
        data: {
            header: 'main_navigation.dashboard'
        },
        component: FeatureAffiliate2DashboardPageComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(dashboardRouter), MatButtonModule],
    declarations: [FeatureAffiliate2DashboardPageComponent]
})
export class FeatureAffiliate2DashboardPageModule {}
