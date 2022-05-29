export enum MetricEnum {
    // Impressions
    Impressions = 'impressions',
    CTR = 'ctr',

    // Clicks
    GrossClicks = 'clicks',
    UniqueClicks = 'unique_clicks',
    DuplicateClicks = 'duplicate_clicks',
    InvalidClicks = 'invalid_clicks',
    ClicksRevenue = 'clicks_revenue',
    ClicksPayout = 'clicks_payout',
    ClicksProfit = 'clicks_profit',
    ClicksMargin = 'clicks_margin',

    // Approved Conversions
    ApprovedConversions = 'cv_approved',
    CR = 'cr',
    ApprovedRevenue = 'approved_revenue',
    ApprovedPayout = 'approved_payout',
    ApprovedProfit = 'approved_profit',
    ApprovedSales = 'approved_gross_sales',
    ApprovedMargin = 'approved_margin',

    // Total Conversions
    TotalConversions = 'cv_total',
    TR = 'tr',
    TotalRevenue = 'total_revenue',
    TotalPayout = 'total_payout',
    TotalProfit = 'total_profit',
    TotalMargin = 'total_margin',
    TotalGrossSales = 'total_gross_sales',

    // Pending Conversions
    PendingConversions = 'cv_pending',
    PR = 'pr',
    PendingRevenue = 'pending_revenue',
    PendingPayout = 'pending_payout',
    PendingProfit = 'pending_profit',
    PendingGrossSales = 'pending_gross_sales',
    PendingMargin = 'pending_margin',

    // Rejected Conversions
    RejectedConversions = 'cv_rejected',
    RR = 'rr',
    RejectedRevenue = 'rejected_revenue',
    RejectedPayout = 'rejected_payout',
    RejectedProfit = 'rejected_profit',
    RejectedSales = 'rejected_margin',
    RejectedGrossSales = 'rejected_gross_sales',

    // Calculations
    RPC = 'rpc',
    CPC = 'cpc',
    EPC = 'epc',
    RPA = 'rpa',
    CPA = 'cpa',
    EPA = 'epa',
    RPM = 'rpm',
    CPM = 'cpm',
    EPM = 'epm'
}
