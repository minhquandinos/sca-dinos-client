import { BaseObjectModel } from '@scaleo/core/data';
import { ReportFilterFilterEnum, ReportFilterUnionType } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

export class ReportStatisticsBreakdownFilterMap {
    static readonly breakdownFiltersMap: BaseObjectModel = {
        [BreakdownEnum.Affiliate]: ReportFilterFilterEnum.Affiliate,
        [BreakdownEnum.Offer]: ReportFilterFilterEnum.Offer,
        [BreakdownEnum.Advertiser]: ReportFilterFilterEnum.Advertiser,
        [BreakdownEnum.DeviceOS]: ReportFilterFilterEnum.DeviceOS,
        [BreakdownEnum.DeviceOSVersion]: ReportFilterFilterEnum.DeviceOSVersion,
        [BreakdownEnum.Country]: ReportFilterFilterEnum.Country,
        [BreakdownEnum.Goals]: ReportFilterFilterEnum.Goal,
        [BreakdownEnum.ConnectionType]: ReportFilterFilterEnum.ConnectionType,
        [BreakdownEnum.DeviceType]: ReportFilterFilterEnum.DeviceType,
        [BreakdownEnum.DeviceBrand]: ReportFilterFilterEnum.DeviceBrand,
        [BreakdownEnum.DeviceModel]: ReportFilterFilterEnum.DeviceModel,
        [BreakdownEnum.AffiliateSource]: ReportFilterFilterEnum.AffiliateSource,
        [BreakdownEnum.AffiliateSubId1]: ReportFilterFilterEnum.AffiliateSubId1,
        [BreakdownEnum.AffiliateSubId2]: ReportFilterFilterEnum.AffiliateSubId2,
        [BreakdownEnum.AffiliateSubId3]: ReportFilterFilterEnum.AffiliateSubId3,
        [BreakdownEnum.AffiliateSubId4]: ReportFilterFilterEnum.AffiliateSubId4,
        [BreakdownEnum.AffiliateSubId5]: ReportFilterFilterEnum.AffiliateSubId5,
        [BreakdownEnum.AffiliateParam1]: ReportFilterFilterEnum.AffiliateParam1,
        [BreakdownEnum.AffiliateParam2]: ReportFilterFilterEnum.AffiliateParam2,
        [BreakdownEnum.AffiliateParam3]: ReportFilterFilterEnum.AffiliateParam3,
        [BreakdownEnum.AffiliateParam4]: ReportFilterFilterEnum.AffiliateParam4,
        [BreakdownEnum.AffiliateParam5]: ReportFilterFilterEnum.AffiliateParam5,
        [BreakdownEnum.ClickRefererUrl]: ReportFilterFilterEnum.ClickRefererUrl,
        [BreakdownEnum.DeepLinkUrl]: ReportFilterFilterEnum.DeepLinkUrl,
        [BreakdownEnum.GoalType]: ReportFilterFilterEnum.GoalType,
        [BreakdownEnum.Currency]: ReportFilterFilterEnum.Currency,
        [BreakdownEnum.Creative]: ReportFilterFilterEnum.Creative,
        [BreakdownEnum.LandingPage]: ReportFilterFilterEnum.LandingPage,
        [BreakdownEnum.AdvertiserTrackId]: ReportFilterFilterEnum.AdvertiserTrackId,
        [BreakdownEnum.AdvertiserParam1]: ReportFilterFilterEnum.AdvertiserParam1,
        [BreakdownEnum.AdvertiserParam2]: ReportFilterFilterEnum.AdvertiserParam2,
        [BreakdownEnum.AdvertiserParam3]: ReportFilterFilterEnum.AdvertiserParam3,
        [BreakdownEnum.AdvertiserParam4]: ReportFilterFilterEnum.AdvertiserParam4,
        [BreakdownEnum.AdvertiserParam5]: ReportFilterFilterEnum.AdvertiserParam5,
        [BreakdownEnum.ConversionRefererUrl]: ReportFilterFilterEnum.ConversionRefererUrl,
        [BreakdownEnum.Browser]: ReportFilterFilterEnum.Browser,
        [BreakdownEnum.Language]: ReportFilterFilterEnum.Language,
        [BreakdownEnum.MobileOperator]: ReportFilterFilterEnum.MobileOperator,
        [BreakdownEnum.SmartLink]: ReportFilterFilterEnum.SmartLinks,
        [BreakdownEnum.PaidToAffiliate]: ReportFilterFilterEnum.PaidToAffiliate,
        [BreakdownEnum.AffiliateInvoice]: ReportFilterFilterEnum.AffiliateInvoice,
        [BreakdownEnum.Hour]: ReportFilterFilterEnum.Hour,
        [BreakdownEnum.AdvertiserManager]: ReportFilterFilterEnum.AdvertiserMananger,
        [BreakdownEnum.AffiliateManager]: ReportFilterFilterEnum.AffiliateManager
    };

    static breakdownFilters(breakdown: BreakdownEnum): ReportFilterUnionType {
        return ReportStatisticsBreakdownFilterMap.breakdownFiltersMap[breakdown]
            ? ReportStatisticsBreakdownFilterMap.breakdownFiltersMap[breakdown]
            : undefined;
    }

    static isBreakdownFilterText(breakdown: BreakdownEnum): boolean {
        const arrText = [
            ReportFilterFilterEnum.AffiliateSubId1,
            ReportFilterFilterEnum.AffiliateSubId2,
            ReportFilterFilterEnum.AffiliateSubId3,
            ReportFilterFilterEnum.AffiliateSubId4,
            ReportFilterFilterEnum.AffiliateSubId5,
            ReportFilterFilterEnum.AffiliateParam1,
            ReportFilterFilterEnum.AffiliateParam2,
            ReportFilterFilterEnum.AffiliateParam3,
            ReportFilterFilterEnum.AffiliateParam4,
            ReportFilterFilterEnum.AffiliateParam5,
            ReportFilterFilterEnum.ClickRefererUrl,
            ReportFilterFilterEnum.DeepLinkUrl,
            ReportFilterFilterEnum.AdvertiserParam1,
            ReportFilterFilterEnum.AdvertiserParam2,
            ReportFilterFilterEnum.AdvertiserParam3,
            ReportFilterFilterEnum.AdvertiserParam4,
            ReportFilterFilterEnum.AdvertiserParam5,
            ReportFilterFilterEnum.ConversionRefererUrl,
            ReportFilterFilterEnum.AdvertiserTrackId
        ];

        return arrText.includes(ReportStatisticsBreakdownFilterMap.breakdownFilters(breakdown) as any);
    }

    static filterBreakdown(filterName: ReportFilterFilterEnum): BreakdownEnum {
        const filtersMap = ReportStatisticsBreakdownFilterMap.breakdownFiltersMap;

        const filterBreakdownMap: BaseObjectModel = {};

        Object.keys(filtersMap).forEach((breakdown) => {
            filterBreakdownMap[filtersMap[breakdown]] = breakdown;
        });

        return filterBreakdownMap[filterName];
    }
}
