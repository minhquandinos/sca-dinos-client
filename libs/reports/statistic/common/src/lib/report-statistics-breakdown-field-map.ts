import { BaseObjectModel } from '@scaleo/core/data';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

export class ReportStatisticsBreakdownFieldMap {
    private static readonly breakdownFieldMap: BaseObjectModel = {
        [BreakdownEnum.Country]: 'country_name',
        [BreakdownEnum.DeviceType]: 'device_name',
        [BreakdownEnum.DeviceOS]: 'os_name',
        [BreakdownEnum.DeviceBrand]: 'brand_name',
        [BreakdownEnum.DeviceModel]: 'model_name',
        [BreakdownEnum.Language]: 'browser_locale_name',
        [BreakdownEnum.MobileOperator]: 'mobile_operator_name',
        [BreakdownEnum.Browser]: 'browser_name',
        [BreakdownEnum.ConnectionType]: 'connection_type_name',
        [BreakdownEnum.Day]: 'date',
        [BreakdownEnum.AffiliateSource]: 'source_name'
    };

    static breakdownField(breakdown: BreakdownEnum | string): string {
        return ReportStatisticsBreakdownFieldMap.breakdownFieldMap[breakdown]
            ? ReportStatisticsBreakdownFieldMap.breakdownFieldMap[breakdown]
            : breakdown;
    }
}
