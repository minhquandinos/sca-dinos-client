export const DASHBOARD_WIDGET = {
    networkSummary: 'network_summary',
    performance: 'performance',
    notifications: 'notifications',
    pendingRecords: 'pending_records',
    pendingRecordsAffiliate: 'pending_records_affiliate',
    topAffiliate: 'top_affiliate',
    topOffer: 'top_offer',
    mgcomTop: 'mgcom_top',
    shortcuts: 'shortcuts',
    offerPromote: 'offer_promote',
    announcements: 'announcements',
    balance: 'balance'
} as const;

export type DashboardWidgetType = typeof DASHBOARD_WIDGET;

export type DashboardWidgetUnionType = typeof DASHBOARD_WIDGET[keyof typeof DASHBOARD_WIDGET];
