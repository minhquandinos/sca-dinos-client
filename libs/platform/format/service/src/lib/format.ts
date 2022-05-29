import { BaseObjectModel } from '@scaleo/core/data';

export class Format {
    static readonly percent = [
        'ctr',
        'cr',
        'pr',
        'rr',
        'tr',
        'clicks_margin',
        'approved_margin',
        'pending_margin',
        'rejected_margin',
        'total_margin',
        'antifraud_logic_score',
        'ar',
        'trash_cr'
    ];

    static readonly money = [
        'approved_gross_sales',
        'pending_gross_sales',
        'rejected_gross_sales',
        'total_gross_sales',
        'clicks_revenue',
        'clicks_payout',
        'clicks_profit',
        'approved_revenue',
        'approved_payout',
        'approved_profit',
        'pending_revenue',
        'pending_payout',
        'pending_profit',
        'rejected_revenue',
        'rejected_payout',
        'rejected_profit',
        'total_revenue',
        'total_payout',
        'total_profit'
    ];

    static readonly coasting = ['rpc', 'cpc', 'epc', 'rpa', 'cpa', 'epa', 'rpm', 'cpm', 'epm'];

    static readonly date = ['day'];

    static readonly fractionDigits: BaseObjectModel<string, number> = {
        approved_margin: 0,
        pending_margin: 0,
        clicks_margin: 0,
        total_margin: 0,
        rejected_margin: 0,
        antifraud_logic_score: 0
    };
}
