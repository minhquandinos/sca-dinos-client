export const LIMITED_AFFILIATE_ENDPOINTS = (): any => endpoints;

export const endpoints = {
    // Dashboard
    'dashboard-statistics': '/limited-affiliate-manager/dashboard/statistics',
    'dashboard-statistics-get-options': '/limited-affiliate-manager/dashboard/{optionsUrl}',
    'dashboard-statistics-top-affiliates': '/limited-affiliate-manager/dashboard/top-affiliates',
    'dashboard-statistics-top-offers': '/limited-affiliate-manager/dashboard/top-offers',
    'dashboard-statistics-network-summary': '/limited-affiliate-manager/dashboard/network-summary',
    'dashboard-performance': '/limited-affiliate-manager/dashboard/performance',
    'dashboard-live-stream': '/limited-affiliate-manager/dashboard/live-stream',
    'dashboard-pending-postbacks': '/limited-affiliate-manager/dashboard/pending-postbacks',
    'dashboard-counts-info': '/limited-affiliate-manager/dashboard/counts-info',

    // Core
    'platform-list': '/platform/lists',
    'platform-counts-info': '/limited-affiliate-manager/counts-info',

    // Offers
    'offers-list': '/limited-affiliate-manager/offers',
    'offer-view': '/limited-affiliate-manager/offers/{id}/view',
    'offers-counts-info': '/limited-affiliate-manager/offers/{id}/counts-info',
    'offers-get-filter-info': '/limited-affiliate-manager/offers/get-filter-info',
    'offers-urls-extended-filter-info': '/limited-affiliate-manager/urls/extended-filter-info',
    'offers-creatives-extended-filter-info': '/limited-affiliate-manager/creatives/extended-filter-info',
    'offers-goals-get-filter-info': '/limited-affiliate-manager/offers/{offerId}/goals/get-filter-info',
    'smart-link-list': '/limited-affiliate-manager/smart-links/index',
    'smart-links': '/limited-affiliate-manager/smart-links/get-filter-info',
    'offer-tracking': '/limited-affiliate-manager/offers/{id}/tracking',
    'offer-tracking-settings': '/limited-affiliate-manager/offers/{id}/tracking-settings',
    'offer-url-get-filter-info': '/limited-affiliate-manager/offers/{offerId}/urls/get-filter-info',
    'default-offer-url': '/limited-affiliate-manager/offers/{offerId}/get-default-offer-url',

    // Offers config
    // Goals
    'offers-goals-list': '/limited-affiliate-manager/offers/{offerId}/goals-list',
    // Targeting
    'offer-targeting': '/limited-affiliate-manager/offers/{offerId}/targeting-edit',
    // Landing Pages
    'offer-urls': '/limited-affiliate-manager/offers/{offerId}/urls-edit',
    // Affiliate Access
    'offer-affiliate-access-v2': '/limited-affiliate-manager/offers/{offerId}/affiliate-access',
    // Custom params
    'custom-params-list': '/limited-affiliate-manager/offers/{offerId}/custom-params-edit',
    'custom-params-view': '/limited-affiliate-manager/offers/{offerId}/custom-params-edit/{id}',
    'custom-params-create': '/limited-affiliate-manager/offers/{offerId}/custom-params-edit',
    'custom-params-update': '/limited-affiliate-manager/offers/{offerId}/custom-params-edit/{id}',
    'custom-params-delete': '/limited-affiliate-manager/offers/{offerId}/custom-params-edit{id}',
    // Creatives
    'offers-creatives-list': '/limited-affiliate-manager/offers/{offerId}/creatives-edit',

    // Affiliates
    'affiliate-list': '/limited-affiliate-manager/affiliates',
    'affiliate-view': '/limited-affiliate-manager/affiliates/{id}',
    'affiliate-create': '/limited-affiliate-manager/affiliates',
    'affiliate-update': '/limited-affiliate-manager/affiliates/{id}',
    'affiliate-update-settings': '/limited-affiliate-manager/affiliates/{id}/settings',
    'affiliate-delete-image': '/limited-affiliate-manager/affiliates/{id}/delete-image',
    'affiliate-get-sponsor': '/limited-affiliate-manager/affiliates/get-sponsors',
    'affiliate-get-filter-info-by-id': '/limited-affiliate-manager/affiliates/{id}/get-filter-info-by-id',
    'affiliate-get-filter-info': '/limited-affiliate-manager/affiliates/get-filter-info',
    'affiliate-get-counts': '/limited-affiliate-manager/affiliates/{id}/get-counts',
    'affiliate-get-by-ids': '/limited-affiliate-manager/affiliates/get-by-ids',
    'affiliate-sources-extended-filter-info': '/limited-affiliate-manager/sources/extended-filter-info',
    'affiliate-sources': '/limited-affiliate-manager/affiliates/{affiliateId}/sources',
    'affiliate-sources-view': '/limited-affiliate-manager/affiliates/{affiliateId}/sources/{id}',
    'affiliate-sources-update': '/limited-affiliate-manager/affiliates/{affiliateId}/sources/{id}',
    'affiliate-sources-delete': '/limited-affiliate-manager/affiliates/{affiliateId}/sources/{id}',
    'select-payment-methods': '/limited-affiliate-manager/affiliates/{id}/billing/select-payment-method',
    'affiliate-domains': '/limited-affiliate-manager/affiliates/{id}/domains',
    'affiliate-domains-view': '/limited-affiliate-manager/affiliates/{affiliateId}/domains/{id}',

    // Reports
    'reports-click-options': '/limited-affiliate-manager/reports/clicks/get-columns',
    'reports-click': '/limited-affiliate-manager/reports/clicks',
    'reports-click-export': '/limited-affiliate-manager/reports/clicks/export',
    'reports-conversions-options': '/limited-affiliate-manager/reports/conversions/get-options',
    'reports-conversions': '/limited-affiliate-manager/reports/conversions',
    'reports-conversions-export': '/limited-affiliate-manager/reports/conversions/export',
    'reports-statistics-options': '/limited-affiliate-manager/reports/statistics/get-options',
    'reports-statistics-breakdowns': '/limited-affiliate-manager/reports/statistics/get-breakdowns',
    'reports-statistics': '/limited-affiliate-manager/reports/statistics',
    'reports-statistics-export': '/limited-affiliate-manager/reports/export',
    'reports-clicks-log': '/limited-affiliate-manager/reports/invalid-clicks-log',
    'reports-clicks-log-options': '/limited-affiliate-manager/reports/invalid-clicks-log/get-options',
    'reports-affiliates-postbacks-log': '/limited-affiliate-manager/reports/affiliates-postbacks-log',
    'reports-affiliates-postbacks-log-options': '/limited-affiliate-manager/reports/affiliates-postbacks-log/get-options',
    'reports-referrals': '/limited-affiliate-manager/reports/referrals',
    'reports-statistic-filters': '/limited-affiliate-manager/reports/statistics/get-filters',
    'reports-conversions-filters': '/limited-affiliate-manager/reports/conversions/get-filters',
    'reports-clicks-filters': '/limited-affiliate-manager/reports/clicks/get-filters',
    'reports-clicks-log-filters': '/limited-affiliate-manager/reports/invalid-clicks-log/get-filters',
    'reports-affiliate-postbacks-filters': '/limited-affiliate-manager/reports/affiliates-postbacks-log/get-filters',
    'payments-methods-list': '/limited-affiliate-manager/payments-methods',
    'payments-methods-filters': '/limited-affiliate-manager/payments-methods/get-payment-method-filter-list',
    'reports-invalid-clicks-log-export': '/limited-affiliate-manager/reports/invalid-clicks-log/export',
    'reports-affiliates-postbacks-log-export': '/limited-affiliate-manager/reports/affiliates-postbacks-log/export',

    // Offers
    'offers-requests-collection': '/offers/requests',
    'offers-requests-change-statuses': '/offers/requests/change-statuses',
    'dashboard-offers-requests': '/dashboard/pending-requests',
    // 'offer-request-change-status': '/limited-affiliate-manager/dashboard/offers-requests/{id}/{status}',
    'offers-goals-extended-filter-info': '/limited-affiliate-manager/goals/extended-filter-info',

    // Postback
    'postback-create': '/limited-affiliate-manager/affiliates/{affiliateId}/postbacks',
    'postbacks-list': '/limited-affiliate-manager/affiliates/{affiliateId}/postbacks',
    'postback-update': '/limited-affiliate-manager/affiliates/{affiliateId}/postbacks/{postbackId}',
    'postback-view': '/limited-affiliate-manager/affiliates/{affiliateId}/postbacks/{postbackId}',
    'postback-delete': '/limited-affiliate-manager/affiliates/{affiliateId}/postbacks/{postbackId}',

    // Payments
    'payments-columns': '/limited-affiliate-manager/payments/get-options',
    'payments-list': '/limited-affiliate-manager/payments/index',
    'payments-export': '/limited-affiliate-manager/payments/export',

    // Managers
    'managers-get-filter-info': '/limited-affiliate-manager/managers/get-filter-info',

    // Billing
    'billing-affiliates-payments-methods': '/limited-affiliate-manager/billing/affiliates-payments-methods/{id}',
    'billing-affiliates-payments-methods-supported-currencies':
        '/limited-affiliate-manager/billing/affiliates-payments-methods/supported-currencies/{currency}',
    'billing-affiliates-payments-methods-create': '/limited-affiliate-manager/billing/affiliates-payments-methods/create',
    'billing-affiliates-payments-methods-update': '/limited-affiliate-manager/billing/affiliates-payments-methods/view-update',
    'billing-affiliates-payments-methods-delete': '/limited-affiliate-manager/billing/affiliates-payments-methods/delete/{id}',
    'billing-affiliates-list': '/limited-affiliate-manager/billing/affiliates/index',
    'billing-affiliates-options': '/limited-affiliate-manager/billing/affiliates/get-options',
    'billing-affiliates-export': '/limited-affiliate-manager/billing/affiliates/export',
    'billing-details': '/limited-affiliate-manager/affiliates/{id}/billing/details',
    'billing-preferences-show': '/limited-affiliate-manager/billing/affiliates/billing-preferences/{id}',
    'affiliate-billing-detail': '/limited-affiliate-manager/billing/affiliates/{id}',
    'affiliate-billing-balance': '/limited-affiliate-manager/billing/affiliates/{id}/balances',
    'billing-balance-due': '/limited-affiliate-manager/billing/affiliates/get-total-balance-due',

    // Invoices
    'billing-invoices-list': '/limited-affiliate-manager/billing/invoices/index',
    'billing-invoices-options': '/limited-affiliate-manager/billing/invoices/get-options',
    'billing-invoices-export': '/limited-affiliate-manager/billing/invoices/export',
    'billing-invoice': '/limited-affiliate-manager/billing/invoices/{id}',
    'billing-invoice-update': '/limited-affiliate-manager/billing/invoices/edit/{id}',
    'billing-invoice-download-pdf': '/limited-affiliate-manager/billing/invoices/{id}/download-pdf',
    'billing-invoice-delete': '/limited-affiliate-manager/billing/invoices/{id}',
    'billing-change-amount': '/limited-affiliate-manager/billing/invoices/change-amount/{id}',
    'billing-invoice-download-selected-pdf': '/limited-affiliate-manager/billing/invoices/download-pdf-zip',
    'billing-invoice-get-payment-method-info': '/limited-affiliate-manager/billing/invoices/get-payment-method-info',
    'billing-invoice-delete-attachment': '/limited-affiliate-manager/billing/invoices/delete-attachment/{id}',
    'billing-change-upload-attachment': '/limited-affiliate-manager/billing/invoices/upload-attachment/{id}',
    'billing-invoice-amount': '/limited-affiliate-manager/billing/invoices/get-total-amount',
    'billing-invoice-get-filter-info': '/limited-affiliate-manager/billing/invoices/get-filter-info',
    'billing-invoice-get-approved-balance': '/limited-affiliate-manager/billing/affiliates/get-approved-balance',
    'billing-invoice-send-payment-request': '/limited-affiliate-manager/billing/invoices/send-payment-request'
};
