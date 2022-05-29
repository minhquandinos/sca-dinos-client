import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DateVariantModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiPageWrapperModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { DashboardPendingAffiliatePostbacksComponent } from './dashboard-pending-affiliate-postbacks.component';

@NgModule({
    declarations: [DashboardPendingAffiliatePostbacksComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule, DateVariantModule, UiPageWrapperModule, UiSimpleTableModule],
    exports: [DashboardPendingAffiliatePostbacksComponent]
})
export class DashboardPendingAffiliatePostbacksModule {}
