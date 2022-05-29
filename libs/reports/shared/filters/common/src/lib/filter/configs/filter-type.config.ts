import { InvoiceStatusNameEnum, ScaleoStatusEnum } from '@scaleo/platform/list/access-data';

import { ReportFiltersSelectedComponentModel } from '../../report-filters-selected-component.model';
import { REPORT_FILTER, ReportFilterUnionType } from '../models/report-filters.model';

export const textareaTypeFilter: ReportFilterUnionType[] = [
    REPORT_FILTER.transactionId,
    REPORT_FILTER.clickId,
    REPORT_FILTER.affiliateClickId,
    REPORT_FILTER.affiliateSubId1,
    REPORT_FILTER.affiliateSubId2,
    REPORT_FILTER.affiliateSubId3,
    REPORT_FILTER.affiliateSubId4,
    REPORT_FILTER.affiliateSubId5,
    REPORT_FILTER.affiliateParam1,
    REPORT_FILTER.affiliateParam2,
    REPORT_FILTER.affiliateParam3,
    REPORT_FILTER.affiliateParam4,
    REPORT_FILTER.affiliateParam5,
    REPORT_FILTER.clickRefererUrl,
    REPORT_FILTER.deepLinkUrl,
    REPORT_FILTER.advertiserTrackId,
    REPORT_FILTER.advertiserOrderId,
    REPORT_FILTER.advertiserUserId,
    REPORT_FILTER.advertiserParam1,
    REPORT_FILTER.advertiserParam2,
    REPORT_FILTER.advertiserParam3,
    REPORT_FILTER.advertiserParam4,
    REPORT_FILTER.advertiserParam5,
    REPORT_FILTER.conversionRefererUrl,
    REPORT_FILTER.deviceOSVersion,
    REPORT_FILTER.browserVersion,
    REPORT_FILTER.ip,
    REPORT_FILTER.idfa,
    REPORT_FILTER.gaid
];

const defaultSelectTypeFilter: ReportFilterUnionType[] = [
    REPORT_FILTER.reason,
    REPORT_FILTER.redirection,
    REPORT_FILTER.result,
    REPORT_FILTER.affiliateSource,
    REPORT_FILTER.goalType,
    REPORT_FILTER.creative,
    REPORT_FILTER.landingPage,
    REPORT_FILTER.deviceType,
    REPORT_FILTER.connectionType,
    REPORT_FILTER.currency
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const selectManagersTypeFilter: ReportFilterUnionType[] = [REPORT_FILTER.affiliateManager, REPORT_FILTER.advertiserMananger];

// eslint-disable-next-line @typescript-eslint/naming-convention
const selectOfferTypeFilter: ReportFilterUnionType[] = [REPORT_FILTER.offer];

// eslint-disable-next-line @typescript-eslint/naming-convention
const selectCountryTypeFilter: ReportFilterUnionType[] = [REPORT_FILTER.country];

// eslint-disable-next-line @typescript-eslint/naming-convention
const selectAdvertiserTypeFilter: ReportFilterUnionType[] = [REPORT_FILTER.advertiser];

// eslint-disable-next-line @typescript-eslint/naming-convention
const selectAffiliateTypeFilter: ReportFilterUnionType[] = [REPORT_FILTER.affiliate];

// eslint-disable-next-line @typescript-eslint/naming-convention
const compositeSelect: ReportFilterUnionType[] = [
    REPORT_FILTER.affiliateSource,
    REPORT_FILTER.goal,
    REPORT_FILTER.creative,
    REPORT_FILTER.landingPage
];

export const reportFilterComponents: ReportFiltersSelectedComponentModel[] = [
    {
        list: textareaTypeFilter,
        component: 'ReportFilterTextComponent',
        instance: {
            keyForFormControl: 'formName',
            shouldAutosize: false,
            rows: 5
        }
    },
    {
        list: selectOfferTypeFilter,
        component: 'FindOfferComponent',
        instance: {
            keyForFormControl: 'formName',
            itemValue: 'id',
            multiple: true,
            perPage: 10,
            hideSelected: true
        }
    },
    {
        list: compositeSelect,
        component: 'ReportFiltersSelectedCompositeFilterComponent',
        instance: {
            keyForFormControl: 'formName',
            multiple: true,
            itemValue: 'id'
        }
    },
    {
        list: [REPORT_FILTER.conversionStatus],
        component: 'FindPlatformStatusesComponent',
        instance: {
            keyForFormControl: 'formName',
            statusList: ScaleoStatusEnum.Conversion,
            hideDot: true,
            itemValue: 'id',
            multiple: true,
            hideSelected: true
        }
    },
    {
        list: defaultSelectTypeFilter,
        component: 'ReportFiltersSelectedDefaultSelectComponent',
        instance: {
            keyForFormControl: 'formName',
            multiple: true,
            itemValue: 'id'
        }
    },
    {
        list: selectManagersTypeFilter,
        component: 'FindManagersComponent',
        instance: {
            keyForFormControl: 'formName',
            multiple: true,
            itemLabel: 'name',
            itemValue: 'id'
        }
    },
    {
        list: selectCountryTypeFilter,
        component: 'FindCountryComponent',
        instance: {
            keyForFormControl: 'formName',
            hideSelected: true,
            multiple: true,
            itemValue: 'id'
        }
    },
    {
        list: selectAdvertiserTypeFilter,
        component: 'FindAdvertisersComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id'
        }
    },
    {
        list: selectAffiliateTypeFilter,
        component: 'FindAffiliatesComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.browser],
        component: 'FindBrowserComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.mobileOperator],
        component: 'FindMobileOperatorsComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.deviceOS],
        component: 'FindOperatingSystemsComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.geo],
        component: 'FindGeoNamesComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.deviceBrand],
        component: 'FindDeviceBrandsComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.deviceModel],
        component: 'FindDeviceModelsComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.language],
        component: 'FindLanguagesComponent',
        instance: {
            keyForFormControl: 'formName',
            hideDropdownArrow: true,
            multiple: true,
            itemValue: 'id',
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.smartLinks],
        component: 'FindSmartLinkComponent',
        instance: {
            keyForFormControl: 'formName',
            itemValue: 'id',
            multiple: true,
            perPage: 10,
            hideSelected: true
        }
    },
    {
        list: [REPORT_FILTER.paidToAffiliate],
        component: 'FindPlatformListComponent',
        instance: {
            keyForFormControl: 'formName',
            platformList: 'invoices_statuses',
            itemValue: 'status',
            multiple: true,
            itemIncrement: 'status',
            perPage: 10,
            hideSelected: true,
            labelShowId: false,
            exceptIds: InvoiceStatusNameEnum.Draft
        }
    },
    {
        list: [REPORT_FILTER.affiliateInvoice],
        component: 'FindInvoicesComponent',
        instance: {
            keyForFormControl: 'formName',
            itemValue: 'id',
            multiple: true
        }
    }
];
