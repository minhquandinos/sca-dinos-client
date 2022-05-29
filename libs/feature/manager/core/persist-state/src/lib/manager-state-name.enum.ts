export enum ManagerStateNameEnum {
    ReportConversions = 'manager-report-conversions',
    ReportStatistics = 'manager-new-report-statistics',
    ReportClicks = 'manager-report-clicks',
    ReportInvalidClicks = 'manager-report-invalid-clicks',
    ReportAffiliatesPostbacks = 'manager-report-affiliates-postbacks',
    ReportAdvertiserPostbacks = 'manager-report-advertiser-postbacks',
    Payments = 'manager-payments',
    Leads = 'manager-leads-list',
    LeadsLogs = 'manager-leads-logs',
    Billing2Invoices = 'manager-billing2-invoices',
    BillingAffiliates = 'manager-billing-affiliates',
    AffiliateAccessInvoices = 'manager-affiliate-access-invoices'
}

const key = 'manager-access';
export const MANAGER_ACCESS_PERSIST_STATE = {
    reportConversions: `${key}-report-conversions`,
    reportStatistics: `${key}-report-statistics`,
    reportClicks: `${key}-report-clicks`,
    reportInvalidClicks: `${key}-report-invalid-clicks`,
    reportAffiliatesPostbacks: `${key}-report-affiliates-postbacks`,
    reportAdvertiserPostbacks: `${key}-report-advertiser-postbacks`,
    payments: `${key}-payments`,
    leads: `${key}-leads-list`,
    leadsLogs: `${key}-leads-logs`,
    billing2Invoices: `${key}-billing2-invoices`,
    billingAffiliates: `${key}-billing-affiliates`,
    affiliateAccessInvoices: `${key}-affiliate-access-invoices`
};
