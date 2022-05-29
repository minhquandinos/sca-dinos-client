export const PLATFORM_PLAN_FEATURE = {
    smartLink: 'smartLink',
    sendEmailNotificationToUser: 'sendEmailNotificationToUser',
    generateInvoiceAutomatically: 'generateInvoiceAutomatically',
    customRole: 'customRole',
    domains: 'affiliateDomains'
} as const;

export type PlatformPlanFeatureUnionType = typeof PLATFORM_PLAN_FEATURE[keyof typeof PLATFORM_PLAN_FEATURE];

export type PlatformPlanFeatureType = typeof PLATFORM_PLAN_FEATURE;
