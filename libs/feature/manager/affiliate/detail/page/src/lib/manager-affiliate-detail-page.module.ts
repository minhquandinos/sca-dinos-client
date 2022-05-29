import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ChartModule } from 'angular-highcharts';

import { ActivityLogEntityDetailWidgetModule } from '@scaleo/activity-log/shared/widgets/activity-log-entity/component';
import { BillingAffiliatePaymentsMethodsModule } from '@scaleo/affiliate-billing/payment-methods/widget/list';
import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateDetailInfoWidgetComponentModule } from '@scaleo/feature/manager/affiliate/detail/detail-widget/component';
import { ManagerAffiliateTrendWidgetModule } from '@scaleo/feature/manager/affiliate/detail/trend/widget';
import { ManagerAffiliateDomainWidgetModule } from '@scaleo/feature/manager/affiliate/domain/widget';
import { ManagerAffiliatePostbackWidgetModule } from '@scaleo/feature/manager/affiliate/postback/widget';
import { AffiliateProfileReferralsModule } from '@scaleo/feature/manager/affiliate/referral/widget/component';
import { CustomChartModule, ManagerListModule, TagsListModule } from '@scaleo/shared/components';
import { ContactIconModule } from '@scaleo/shared/components/contact';
import { TrendsWidgetModule } from '@scaleo/shared/components2/trends-widget';
import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';
import { StickyModule } from '@scaleo/shared/directives';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import {
    UiButtonLinkModule,
    UiChipModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { AffiliateConfigLayoutComponent } from './layouts/affiliate-config-layout/affiliate-config-layout.component';
import { AffiliateProfileLayoutComponent } from './layouts/affiliate-profile-layout/affiliate-profile-layout.component';
import { ManagerAffiliateDetailPageRoutingModule } from './manager-affiliate-detail-page-routing.module';
import { ManagerAffiliateProfileComponent } from './manager-affiliate-profile.component';

@NgModule({
    declarations: [ManagerAffiliateProfileComponent, AffiliateProfileLayoutComponent, AffiliateConfigLayoutComponent],
    exports: [ManagerAffiliateProfileComponent],
    imports: [
        CommonModule,
        ManagerAffiliateDetailPageRoutingModule,
        UiStatusColorModule,
        UiButtonLinkModule,
        ChartModule,
        CustomChartModule,
        SharedModule,
        UiSkeletonModule,
        UiChipModule,
        UiSvgIconModule,
        UiTableModule,
        TagsListModule,
        ManagerListModule,
        ContactIconModule,
        ActivityLogEntityDetailWidgetModule,
        BillingAffiliatePaymentsMethodsModule,
        TrendsWidgetModule,
        StickyModule,
        FlexModule,
        CustomFlexModule,
        ManagerAffiliateDetailInfoWidgetComponentModule,
        ManagerAffiliatePostbackWidgetModule,
        ManagerAffiliateDomainWidgetModule,
        AffiliateProfileReferralsModule,
        FlexLayoutModule,
        ManagerAffiliateTrendWidgetModule
    ],
    providers: [ConfigCustomFieldService]
})
export class ManagerAffiliateDetailPageModule {}
