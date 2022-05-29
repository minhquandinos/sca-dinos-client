import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
// import { DashboardPendingAffiliatePostbacksModule } from '@scaleo/dashboard/shared/widgets/pending-records/affiliate-postback/component';
import { DashboardPendingOfferRequestsModule } from '@scaleo/dashboard/shared/widgets/pending-records/offer-request/component';
import { DashboardPendingAdvertiserModule } from '@scaleo/feature/manager/dashboard/widgets/pending-records/shared/advertiser-pending/component';
import { DashboardPendingAffiliateModule } from '@scaleo/feature/manager/dashboard/widgets/pending-records/shared/affiliate-pending/component';
import { ManagerOfferRequestSolveControlModule } from '@scaleo/feature/manager/offer/request/solve/control';
import { ManagerOfferRequestSolveModalViewAnswerModule } from '@scaleo/feature/manager/offer/request/solve/modal-view-answer';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule, HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiBadgesModule, UiButtonLinkModule, UiTabModule } from '@scaleo/ui-kit/elements';

import { ManagerDashboardPendingRecordWidgetComponent } from './manager-dashboard-pending-record-widget.component';

@NgModule({
    declarations: [ManagerDashboardPendingRecordWidgetComponent],
    imports: [
        CommonModule,
        DashboardPendingAdvertiserModule,
        DashboardPendingAffiliateModule,
        UiTabModule,
        UiBadgesModule,
        SharedModule,
        ContainerWidgetModule,
        UiButtonLinkModule,
        // DashboardPendingAffiliatePostbacksModule,
        TableNavigationModule,
        PlatformFormatPipeModule,
        DashboardPendingOfferRequestsModule,
        HyperlinkModule,
        ManagerOfferRequestSolveControlModule,
        ManagerOfferRequestSolveModalViewAnswerModule,
        NavigateRootModule,
        DateVariantModule
    ],
    exports: [ManagerDashboardPendingRecordWidgetComponent]
})
export class ManagerDashboardPendingRecordWidgetModule {}
