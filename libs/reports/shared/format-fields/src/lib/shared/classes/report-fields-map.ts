import { ReportStatisticsBreakdownFieldMap } from '../../../../../../statistic/common/src/lib/report-statistics-breakdown-field-map';
import { ReportFieldConversionStatusComponent } from '../components/report-field-conversion-status/report-field-conversion-status.component';
import { ReportFieldCountryComponent } from '../components/report-field-country/report-field-country.component';
import { ReportFieldDayComponent } from '../components/report-field-day/report-field-day.component';
import { ReportFieldDefaultComponent } from '../components/report-field-default/report-field-default.component';
import { ReportFieldDeliveryStatusComponent } from '../components/report-field-delivery-status/report-field-delivery-status.component';
import { ReportFieldDeviceTypeComponent } from '../components/report-field-device-type/report-field-device-type.component';
import { ReportFieldGeoComponent } from '../components/report-field-geo/report-field-geo.component';
import { ReportFieldGoalIdComponent } from '../components/report-field-goal-id/report-field-goal-id.component';
import { ReportFieldHourComponent } from '../components/report-field-hour/report-field-hour.component';
import { ReportFieldInsightsComponent } from '../components/report-field-insights/report-field-insights.component';
import { ReportFieldLinkComponent } from '../components/report-field-link/report-field-link.component';
import { ReportFieldLinkRelation2Component } from '../components/report-field-link-relation2/containers/report-field-link-relation2/report-field-link-relation2.component';
import { ReportFieldClicksComponent } from '../components/report-field-link-report/components/report-field-clicks.component';
import { ReportFieldCvApprovedComponent } from '../components/report-field-link-report/components/report-field-cv-approved.component';
import { ReportFieldCvPendingComponent } from '../components/report-field-link-report/components/report-field-cv-pending.component';
import { ReportFieldCvRejectedComponent } from '../components/report-field-link-report/components/report-field-cv-rejected.component';
import { ReportFieldCvTotalComponent } from '../components/report-field-link-report/components/report-field-cv-total.component';
import { ReportFieldCvTrashComponent } from '../components/report-field-link-report/components/report-field-cv-trash.component';
import { ReportFieldInvalidClicksComponent } from '../components/report-field-link-report/components/report-field-invalid-clicks.component';
import { ReportFieldMonthComponent } from '../components/report-field-month/report-field-month.component';
import { ReportFieldPaidToAffiliateComponent } from '../components/report-field-paid-to-affiliate/report-field-paid-to-affiliate.component';
import { ReportFieldSmartlinkComponent } from '../components/report-field-smartlink/report-field-smartlink.component';
import { ReportFieldSubIdComponent } from '../components/report-field-sub-id/report-field-sub-id.component';
import { ReportFieldTimeDifferenceComponent } from '../components/report-field-time-difference/report-field-time-difference.component';

export class ReportFieldsMap {
    private static readonly components: { [key: string]: any } = {
        affiliate: ReportFieldLinkComponent,
        advertiser: ReportFieldLinkComponent,
        offer: ReportFieldLinkComponent,
        goal: ReportFieldLinkRelation2Component,
        link: ReportFieldLinkRelation2Component,
        creative: ReportFieldLinkRelation2Component,
        goal_id: ReportFieldGoalIdComponent,
        geo: ReportFieldGeoComponent,
        conversion_status: ReportFieldConversionStatusComponent,
        time_difference: ReportFieldTimeDifferenceComponent,
        hour: ReportFieldHourComponent,
        month: ReportFieldMonthComponent,
        country: ReportFieldCountryComponent,
        day: ReportFieldDayComponent,
        sub_id1: ReportFieldSubIdComponent,
        sub_id2: ReportFieldSubIdComponent,
        sub_id3: ReportFieldSubIdComponent,
        sub_id4: ReportFieldSubIdComponent,
        sub_id5: ReportFieldSubIdComponent,
        insights: ReportFieldInsightsComponent,
        device_type: ReportFieldDeviceTypeComponent,
        clicks: ReportFieldClicksComponent,
        invalid_clicks: ReportFieldInvalidClicksComponent,
        cv_approved: ReportFieldCvApprovedComponent,
        cv_total: ReportFieldCvTotalComponent,
        cv_pending: ReportFieldCvPendingComponent,
        cv_rejected: ReportFieldCvRejectedComponent,
        smartlink: ReportFieldSmartlinkComponent,
        cv_trash: ReportFieldCvTrashComponent,
        paid_to_affiliate: ReportFieldPaidToAffiliateComponent,
        delivery_status: ReportFieldDeliveryStatusComponent
    };

    static getComponent(key: string): any {
        const fieldsMap = ReportFieldsMap.components;
        return Object.keys(fieldsMap).includes(key) ? fieldsMap[key] : ReportFieldDefaultComponent;
    }

    static getKeyField(key: string): string {
        return ReportStatisticsBreakdownFieldMap.breakdownField(key);
    }
}
