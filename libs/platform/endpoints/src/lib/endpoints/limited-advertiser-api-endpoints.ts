export const LIMITED_ADVERTISER_ENDPOINTS = (): any => endpoints;

export const endpoints = {
    // Dashboard
    'dashboard-statistics': '/limited-advertiser-manager/dashboard/statistics',
    'dashboard-statistics-get-options': '/limited-advertiser-manager/dashboard/{optionsUrl}',
    'dashboard-statistics-top-affiliates': '/limited-advertiser-manager/dashboard/top-affiliates',
    'dashboard-statistics-top-offers': '/limited-advertiser-manager/dashboard/top-offers',
    'dashboard-statistics-network-summary': '/limited-advertiser-manager/dashboard/network-summary',
    'dashboard-performance': '/limited-advertiser-manager/dashboard/performance',
    'dashboard-live-stream': '/limited-advertiser-manager/dashboard/live-stream',
    'dashboard-pending-postbacks': '/limited-advertiser-manager/dashboard/pending-postbacks',
    'dashboard-counts-info': '/limited-advertiser-manager/dashboard/counts-info',

    // Core
    'platform-list': '/platform/lists',
    'platform-counts-info': '/limited-advertiser-manager/counts-info',

    // Offers
    'offers-list': '/limited-advertiser-manager/offers',
    'offer-create': '/limited-advertiser-manager/offers/create',
    'offer-update': '/limited-advertiser-manager/offers/{id}/edit-form',
    'offer-delete': '/limited-advertiser-manager/offers/{id}',
    'offer-view': '/limited-advertiser-manager/offers/{id}/view',
    'offer-edit-view': '/limited-advertiser-manager/offers/{id}/edit-form',
    'offers-get-filter-info': '/limited-advertiser-manager/offers/get-filter-info',
    // 'offer-affiliate-access': '/limited-advertiser-manager/offers/{offerId}/affiliate-access', // TODO remove
    'offers-urls-extended-filter-info': '/limited-advertiser-manager/urls/extended-filter-info',
    'offers-creatives-extended-filter-info': '/limited-advertiser-manager/creatives/extended-filter-info',
    'offers-goals-get-filter-info': '/limited-advertiser-manager/offers/{offerId}/goals/get-filter-info',
    'smart-link-list': '/limited-advertiser-manager/smart-links/index',
    'smart-links': '/limited-advertiser-manager/smart-links/get-filter-info',
    'offers-has-cpc': '/limited-advertiser-manager/offers/{offerId}/has-cpc',
    'offers-goals-create': '/limited-advertiser-manager/offers/{offerId}/goals',
    'offers-goals-update': '/limited-advertiser-manager/offers/{offerId}/goals/{id}',
    'offers-goals-view': '/limited-advertiser-manager/offers/{offerId}/goals/{id}',
    'offers-goals-delete': '/limited-advertiser-manager/offers/{offerId}/goals/{id}',
    // 'offer-urls': '/limited-advertiser-manager/offers/{id}/urls',
    'offer-urls-create': '/limited-advertiser-manager/offers/{id}/urls',
    'offer-urls-view': '/limited-advertiser-manager/offers/{offerId}/urls/{id}',
    'offer-urls-update': '/limited-advertiser-manager/offers/{offerId}/urls/{id}',
    'offer-urls-delete': '/limited-advertiser-manager/offers/{offerId}/urls/{id}',
    'offers-creatives-list': '/limited-advertiser-manager/offers/{offerId}/creatives-edit',
    'offer-creatives-create': '/limited-advertiser-manager/offers/{offerId}/creatives-edit',
    'offer-creatives-update': '/limited-advertiser-manager/offers/{offerId}/creatives-edit/{id}',
    'offer-creatives-delete': '/limited-advertiser-manager/offers/{offerId}/creatives-edit/{id}',
    'offer-creatives-view': '/limited-advertiser-manager/offers/{offerId}/creatives-edit/{id}',

    // Offer config
    // 'offer-targeting': '/limited-advertiser-manager/offers/{id}/targeting', // TODO remove
    'offer-targeting': '/limited-advertiser-manager/offers/{offerId}/targeting-edit',
    // Landing Pages
    'offer-urls': '/limited-advertiser-manager/offers/{offerId}/urls-edit',
    'offer-url-create': '/limited-advertiser-manager/offers/{offerId}/urls-edit',
    'offer-url': '/limited-advertiser-manager/offers/{offerId}/urls-edit/{id}',
    'offer-url-get-filter-info': '/limited-advertiser-manager/offers/{offerId}/urls/get-filter-info',
    'default-offer-url': '/limited-advertiser-manager/offers/{offerId}/get-default-offer-url',

    // Affiliates
    'affiliate-list': '/limited-advertiser-manager/affiliates',
    'affiliate-view': '/limited-advertiser-manager/affiliates/{id}',
    'affiliate-create': '/limited-advertiser-manager/affiliates',
    'affiliate-update': '/limited-advertiser-manager/affiliates/{id}',
    'affiliate-delete-image': '/limited-advertiser-manager/affiliates/{id}/delete-image',
    'affiliate-get-sponsor': '/limited-advertiser-manager/affiliates/get-sponsors',
    'affiliate-get-filter-info-by-id': '/limited-advertiser-manager/affiliates/{id}/get-filter-info-by-id',
    'affiliate-get-filter-info': '/limited-advertiser-manager/affiliates/get-filter-info',
    'affiliate-get-counts': '/limited-advertiser-manager/affiliates/{id}/get-counts',
    'affiliate-get-by-ids': '/limited-advertiser-manager/affiliates/get-by-ids',
    'affiliate-sources-extended-filter-info': '/limited-advertiser-manager/sources/extended-filter-info',
    'affiliate-sources': '/limited-advertiser-manager/affiliates/{affiliateId}/sources',
    'affiliate-sources-view': '/limited-advertiser-manager/affiliates/{affiliateId}/sources/{id}',
    'affiliate-sources-update': '/limited-advertiser-manager/affiliates/{affiliateId}/sources/{id}',
    'affiliate-sources-delete': '/limited-advertiser-manager/affiliates/{affiliateId}/sources/{id}',
    'billing-details': '/limited-advertiser-manager/affiliates/{id}/billing/details',
    'select-payment-methods': '/limited-advertiser-manager/affiliates/{id}/billing/select-payment-method',
    'affiliate-domains': '/limited-advertiser-manager/affiliates/{id}/domains',
    'affiliate-domains-view': '/limited-advertiser-manager/affiliates/{affiliateId}/domains/{id}',

    // Reports
    'reports-click-options': '/limited-advertiser-manager/reports/clicks/get-options',
    'reports-click': '/limited-advertiser-manager/reports/clicks',
    'reports-click-export': '/limited-advertiser-manager/reports/clicks/export',
    'reports-conversions-options': '/limited-advertiser-manager/reports/conversions/get-options',
    'reports-conversions': '/limited-advertiser-manager/reports/conversions',
    'reports-conversions-export': '/limited-advertiser-manager/reports/conversions/export',
    'reports-statistics-options': '/limited-advertiser-manager/reports/statistics/get-options',
    'reports-statistics-breakdowns': '/limited-advertiser-manager/reports/statistics/get-breakdowns',
    'reports-statistics': '/limited-advertiser-manager/reports/statistics',
    'reports-statistics-export': '/limited-advertiser-manager/reports/export',
    'reports-clicks-log': '/limited-advertiser-manager/reports/invalid-clicks-log',
    'reports-clicks-log-options': '/limited-advertiser-manager/reports/invalid-clicks-log/get-options',
    'reports-affiliates-postbacks-log': '/limited-advertiser-manager/reports/affiliates-postbacks-log',
    'reports-affiliates-postbacks-log-options': '/limited-advertiser-manager/reports/affiliates-postbacks-log/get-options',
    'reports-referrals': '/limited-advertiser-manager/reports/referrals',
    'reports-statistic-filters': '/limited-advertiser-manager/reports/statistics/get-filters',
    'reports-conversions-filters': '/limited-advertiser-manager/reports/conversions/get-filters',
    'reports-clicks-filters': '/limited-advertiser-manager/reports/clicks/get-filters',
    'reports-clicks-log-filters': '/limited-advertiser-manager/reports/invalid-clicks-log/get-filters',
    'reports-affiliate-postbacks-filters': '/limited-advertiser-manager/reports/affiliates-postbacks-log/get-filters',
    'payments-methods-list': '/limited-advertiser-manager/payments-methods',
    'reports-advertiser-postbacks-log': '/limited-advertiser-manager/statistics/advertisers-postbacks-log',
    'reports-advertiser-postbacks-log-options': '/limited-advertiser-manager/statistics/advertisers-postbacks-log/get-options',
    'reports-advertiser-postbacks-filters': '/limited-advertiser-manager/statistics/advertisers-postbacks-log/get-filters',
    'reports-invalid-clicks-log-export': '/limited-advertiser-manager/reports/invalid-clicks-log/export',
    'reports-conversions-change-status': '/limited-advertiser-manager/reports/conversions/change-status',

    // Offers
    // 'offers-requests': '/limited-advertiser-manager/dashboard/pending-requests',
    // 'offer-request-change-status': '/limited-advertiser-manager/dashboard/offers-requests/{id}/{status}',
    'offers-goals-extended-filter-info': '/limited-advertiser-manager/goals/extended-filter-info',
    'custom-params-list': '/limited-advertiser-manager/offers/{offerId}/custom-params-edit',
    'custom-params-view': '/limited-advertiser-manager/offers/{offerId}/custom-params-edit/{id}',
    'custom-params-create': '/limited-advertiser-manager/offers/{offerId}/custom-params-edit',
    'custom-params-update': '/limited-advertiser-manager/offers/{offerId}/custom-params-edit/{id}',
    'custom-params-delete': '/limited-advertiser-manager/offers/{offerId}/custom-params-edit/{id}',
    'offers-counts-info': '/limited-advertiser-manager/offers/{id}/counts-info',
    'offer-tracking': '/limited-advertiser-manager/offers/{id}/tracking',
    'offer-tracking-settings': '/limited-advertiser-manager/offers/{id}/tracking-settings',
    // 'offers-goals-list': '/limited-advertiser-manager/offers/{offerId}/goals?',

    // Offers config
    // Goals
    'offers-goals-list': '/limited-advertiser-manager/offers/{offerId}/goals-list',
    'offers-goal-create': '/limited-advertiser-manager/offers/{offerId}/goals-list',
    'offers-goal': '/limited-advertiser-manager/offers/{offerId}/goals-list/{goalId}',
    // Affiliate Access
    'offer-affiliate-access-v2': '/limited-advertiser-manager/offers/{offerId}/affiliate-access',

    // Postback
    'postback-create': '/limited-advertiser-manager/affiliates/{affiliateId}/postbacks',
    'postbacks-list': '/limited-advertiser-manager/affiliates/{affiliateId}/postbacks',
    'postback-update': '/limited-advertiser-manager/affiliates/{affiliateId}/postbacks/{postbackId}',
    'postback-view': '/limited-advertiser-manager/affiliates/{affiliateId}/postbacks/{postbackId}',
    'postback-delete': '/limited-advertiser-manager/affiliates/{affiliateId}/postbacks/{postbackId}',

    // Payments
    'payments-columns': '/limited-advertiser-manager/payments/get-options',
    'payments-list': '/limited-advertiser-manager/payments/index',
    'payments-export': '/limited-advertiser-manager/payments/export',

    // Managers
    'managers-get-filter-info': '/limited-advertiser-manager/managers/get-filter-info',

    // Advertisers
    'advertisers-list': '/limited-advertiser-manager/advertisers',
    'advertiser-get-filter-info': '/limited-advertiser-manager/advertisers/get-filter-info',
    advertiser: '/limited-advertiser-manager/advertisers/{id}',
    'advertiser-create': '/limited-advertiser-manager/advertisers',
    'advertiser-get-filter-info-by-id': '/limited-advertiser-manager/advertisers/get-filter-info-by-id',

    'activity-log': '/limited-advertiser-manager/administration/activity-log',

    // Leads
    'leads-list': '/limited-advertiser-manager/leads',
    'leads-list-options': '/limited-advertiser-manager/leads/get-options',
    'leads-deliver-again': '/limited-advertiser-manager/leads/deliver-again',
    'leads-logs': '/limited-advertiser-manager/leads/log',
    'leads-logs-options': '/limited-advertiser-manager/leads/log/get-options/{logType}',
    'leads-list-filters': '/limited-advertiser-manager/leads/get-filters',
    'leads-receive-campaigns-list': '/limited-advertiser-manager/leads/receive',
    'leads-receive-campaigns-update': '/limited-advertiser-manager/leads/receive/{id}',
    'leads-receive-campaigns-view': '/limited-advertiser-manager/leads/receive/{id}',
    'leads-receive-campaigns-delete': '/limited-advertiser-manager/leads/receive/{id}',
    'leads-receive-campaigns-create': '/limited-advertiser-manager/leads/receive',
    'leads-receive-campaigns-filters': '/limited-advertiser-manager/leads/receive/get-filter-info',
    'leads-delivery-create': '/limited-advertiser-manager/leads/deliver',
    'leads-delivery-delete': '/limited-advertiser-manager/leads/deliver/{id}',
    'leads-delivery-list': '/limited-advertiser-manager/leads/deliver',
    'leads-delivery-update': '/limited-advertiser-manager/leads/deliver/{id}',
    'leads-delivery-view': '/limited-advertiser-manager/leads/deliver/{id}'
};
