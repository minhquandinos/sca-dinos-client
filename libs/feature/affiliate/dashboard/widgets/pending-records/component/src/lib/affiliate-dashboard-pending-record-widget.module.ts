import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
// import { DashboardPendingAffiliatePostbacksModule } from '@scaleo/dashboard/shared/widgets/pending-records/affiliate-postback/component';
import { DashboardPendingOfferRequestsModule } from '@scaleo/dashboard/shared/widgets/pending-records/offer-request/component';
import { OfferRequestModalViewAnswerModule } from '@scaleo/offer/request/view-answer/modal-info';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule, NavigateRootModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiBadgesModule, UiButtonLinkModule, UiTabModule } from '@scaleo/ui-kit/elements';

import { AffiliateDashboardPendingRecordWidgetComponent } from './affiliate-dashboard-pending-record-widget.component';

@NgModule({
    declarations: [AffiliateDashboardPendingRecordWidgetComponent],
    imports: [
        CommonModule,
        UiTabModule,
        UiBadgesModule,
        SharedModule,
        ContainerWidgetModule,
        UiButtonLinkModule,
        // TODO for now this functional is disabled
        // DashboardPendingAffiliatePostbacksModule,
        TableNavigationModule,
        PlatformFormatPipeModule,
        DashboardPendingOfferRequestsModule,
        OfferRequestModalViewAnswerModule,
        DateVariantModule,
        RouterModule,
        NavigateRootModule
    ],
    exports: [AffiliateDashboardPendingRecordWidgetComponent]
})
export class AffiliateDashboardPendingRecordWidgetModule {}
