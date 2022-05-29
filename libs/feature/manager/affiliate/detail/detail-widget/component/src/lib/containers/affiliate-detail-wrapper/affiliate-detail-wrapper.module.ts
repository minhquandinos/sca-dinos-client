import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerAffiliateDetailInfoWidgetComponentModule } from '../../manager-affiliate-detail-info-widget-component.module';
import { AffiliateDetailWrapperComponent } from './affiliate-detail-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateDetailWrapperComponent
    }
];

@NgModule({
    declarations: [AffiliateDetailWrapperComponent],
    imports: [CommonModule, ManagerAffiliateDetailInfoWidgetComponentModule, RouterModule.forChild(routes)],
    exports: [AffiliateDetailWrapperComponent]
})
export class AffiliateDetailWrapperModule {}
