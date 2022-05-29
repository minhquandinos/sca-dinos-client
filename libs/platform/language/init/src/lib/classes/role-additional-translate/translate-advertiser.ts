import { BaseObjectModel } from '@scaleo/core/data';

export class TranslateAdvertiser {
    public static translateSchema: BaseObjectModel = {
        en: {
            interface: {
                table: {
                    clicks_revenue: 'Payout',
                    approved_revenue: 'Payout',
                    total_revenue: 'Payout',
                    pending_revenue: 'Payout',
                    rejected_revenue: 'Payout',
                    revenue: 'Payout',
                    rpc: 'CPC',
                    rpa: 'CPA',
                    rpm: 'CPM'
                }
            },
            dashboard_page: {
                legend: {
                    approved_revenue: 'Approved Payout',
                    pending_revenue: 'Pending Payout',
                    clicks_revenue: 'Clicks Payout',
                    total_revenue: 'Total Payout',
                    rejected_revenue: 'Rejected Payout',
                    rpc: 'CPC',
                    rpa: 'CPA',
                    rpm: 'CPM'
                }
            }
        },
        ru: {
            interface: {
                table: {
                    clicks_revenue: 'Выплата',
                    approved_revenue: 'Выплата',
                    total_revenue: 'Выплата',
                    pending_revenue: 'Выплата',
                    rejected_revenue: 'Выплата',
                    revenue: 'Выплата',
                    rpc: 'CPC',
                    rpa: 'CPA',
                    rpm: 'CPM'
                }
            },
            dashboard_page: {
                legend: {
                    approved_revenue: 'Подтвержденная выплата',
                    pending_revenue: 'Неподтвержденная выплата',
                    clicks_revenue: 'Выплата клики',
                    total_revenue: 'Вся выплата',
                    rejected_revenue: 'Отклоненная выплата',
                    rpc: 'CPC',
                    rpa: 'CPA',
                    rpm: 'CPM'
                }
            }
        }
    };
}
