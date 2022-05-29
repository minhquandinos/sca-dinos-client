import { BaseObjectModel } from '@scaleo/core/data';

export const ADVERTISER_API_ENDPOINTS: Readonly<BaseObjectModel<string, string>> = {
    // Dashboard
    'dashboard-config': '/dashboard/widget-settings/config',
    'dashboard-statistics-network-summary': '/dashboard/statistics/network-summary',
    'dashboard-statistics-get-options': '/advertiser/dashboard/statistics/{optionsUrl}',
    'dashboard-statistics': '/advertiser/dashboard/statistics',
    'dashboard-statistics-top-offers': '/advertiser/dashboard/statistics/top-offers',
    'platform-list': '/advertiser/lists',
    'platform-counts-info': '/advertiser/offers/counts-info',
    'offers-list': '/advertiser/offers',
    'offer-view': '/advertiser/offers/{id}',
    'offers-get-filter-info': '/advertiser/offers/get-filter-info',

    // Reports
    'offers-goals-extended-filter-info': '/advertiser/goals/extended-filter-info',
    'offers-urls-extended-filter-info': '/advertiser/urls/extended-filter-info',
    'offers-creatives-extended-filter-info': '/advertiser/creatives/extended-filter-info',
    'reports-statistics-options': '/advertiser/reports/statistics/get-options',
    'reports-statistics-breakdowns': '/advertiser/reports/statistics/get-breakdowns',
    'reports-statistics': '/advertiser/reports/statistics',
    'reports-statistics-export': '/advertiser/reports/export',
    'reports-conversions': '/advertiser/reports/conversions',
    'reports-conversions-export': '/advertiser/reports/conversions/export',
    'reports-conversions-options': '/advertiser/reports/conversions/get-options',
    'reports-click-options': '/advertiser/reports/clicks/get-options',
    'reports-click': '/advertiser/reports/clicks',
    'reports-click-export': '/advertiser/reports/clicks/export',
    'reports-statistic-filters': '/advertiser/reports/statistics/get-filters',
    'reports-conversions-filters': '/advertiser/reports/conversions/get-filters',
    'reports-clicks-filters': '/advertiser/reports/clicks/get-filters',

    'activity-log': '/advertiser/administration/activity-log',
    'announcements-list': '/announcements'
} as const;
