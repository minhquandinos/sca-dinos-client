import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';

import { ReportFieldConversionStatusModule } from './components/report-field-conversion-status/report-field-conversion-status.module';
import { ReportFieldCountryModule } from './components/report-field-country/report-field-country.module';
import { ReportFieldDayModule } from './components/report-field-day/report-field-day.module';
import { ReportFieldDefaultModule } from './components/report-field-default/report-field-default.module';
import { ReportFieldDeliveryStatusComponent } from './components/report-field-delivery-status/report-field-delivery-status.component';
import { ReportFieldDeviceTypeModule } from './components/report-field-device-type/report-field-device-type.module';
import { ReportFieldGeoModule } from './components/report-field-geo/report-field-geo.module';
import { ReportFieldGoalIdModule } from './components/report-field-goal-id/report-field-goal-id.module';
import { ReportFieldHourModule } from './components/report-field-hour/report-field-hour.module';
import { ReportFieldInsightsModule } from './components/report-field-insights/report-field-insights.module';
import { ReportFieldLinkModule } from './components/report-field-link/report-field-link.module';
import { ReportFieldLinkRelation2Module } from './components/report-field-link-relation2/report-field-link-relation2.module';
import { ReportFieldLinkReportModule } from './components/report-field-link-report/report-field-link-report.module';
import { ReportFieldMonthModule } from './components/report-field-month/report-field-month.module';
import { ReportFieldPaidToAffiliateComponent } from './components/report-field-paid-to-affiliate/report-field-paid-to-affiliate.component';
import { ReportFieldSmartlinkComponent } from './components/report-field-smartlink/report-field-smartlink.component';
import { ReportFieldSourceNameModule } from './components/report-field-source-name/report-field-source-name.module';
import { ReportFieldSubIdModule } from './components/report-field-sub-id/report-field-sub-id.module';
import { ReportFieldTimeDifferenceModule } from './components/report-field-time-difference/report-field-time-difference.module';

@NgModule({
    imports: [
        CommonModule,
        ReportFieldDefaultModule,
        ReportFieldDayModule,
        ReportFieldCountryModule,
        ReportFieldGoalIdModule,
        ReportFieldHourModule,
        ReportFieldMonthModule,
        ReportFieldGeoModule,
        ReportFieldTimeDifferenceModule,
        ReportFieldConversionStatusModule,
        ReportFieldLinkModule,
        ReportFieldSubIdModule,
        ReportFieldSourceNameModule,
        ReportFieldInsightsModule,
        ReportFieldLinkRelation2Module,
        ReportFieldDeviceTypeModule,
        ReportFieldLinkReportModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        NavigateRootModule,
        PlatformStatusesModule
    ],
    declarations: [ReportFieldSmartlinkComponent, ReportFieldPaidToAffiliateComponent, ReportFieldDeliveryStatusComponent]
})
export class ReportFormatFieldsSharedModule {}
