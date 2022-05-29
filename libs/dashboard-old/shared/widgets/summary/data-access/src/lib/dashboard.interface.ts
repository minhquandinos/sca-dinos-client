export interface DashboardTopBaseInterface {
    breakdownsColumns: BreakdownsColumnsInterface[];
}

export interface BreakdownsColumnsInterface {
    label: string;
    columns: string[];
    breakdown: string;
}

export interface DashboardTopBaseTotalsInterface {
    clicks: number;
    cv_approved: number;
    cv_pending: number;
    approved_revenue: string;
}

export interface DashboardTopOfferTotalsInterface extends DashboardTopBaseTotalsInterface {
    offer: string;
}

export interface DashboardTopAffiliateTotalsInterface extends DashboardTopBaseTotalsInterface {
    affiliate: string;
}

export interface DashboardTopAffiliateInterface extends DashboardTopBaseInterface {
    totals: DashboardTopAffiliateTotalsInterface;
    rows: DashboardTopAffiliateRowsInterface[];
}

export interface DashboardTopOfferInterface extends DashboardTopBaseInterface {
    totals: DashboardTopOfferTotalsInterface;
    rows: DashboardTopOfferRowsInterface[];
}

export interface DashboardTopBaseRowsInterface {
    clicks: number;
    cv_approved: number;
    cv_pending: number;
    approved_revenue: string;
}

export interface DashboardTopAffiliateRowsInterface extends DashboardTopBaseRowsInterface {
    affiliate: string;
}

export interface DashboardTopOfferRowsInterface extends DashboardTopBaseRowsInterface {
    offer: string;
    cv_total: string;
    offer_id: number;
    offer_name: string;
    total_revenue: string;
}

export interface DashboardStatisticsInterface {
    [key: string]: DashboardStatisticsItemInterface;
}

export interface DashboardStatisticsItemInterface {
    name: string;
    data: string[] | number[];
}

export type DashboardSummaryMenuType = 'volume' | 'finances';
