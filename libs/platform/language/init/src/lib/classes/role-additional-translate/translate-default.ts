import { BaseObjectModel } from '@scaleo/core/data';

export class TranslateDefault {
    public static translateSchema: BaseObjectModel = {
        en: {
            interface: {
                table: {
                    clicks_revenue: 'Revenue',
                    approved_revenue: 'Revenue',
                    total_revenue: 'Revenue',
                    pending_revenue: 'Revenue',
                    rejected_revenue: 'Revenue',
                    revenue: 'Revenue',
                    rpc: 'RPC',
                    rpa: 'RPA',
                    rpm: 'RPM'
                }
            },
            dashboard_page: {
                legend: {
                    approved_revenue: 'Approved Revenue',
                    pending_revenue: 'Pending Revenue',
                    clicks_revenue: 'Clicks Revenue',
                    total_revenue: 'Total Revenue',
                    rejected_revenue: 'Rejected Revenue',
                    rpc: 'RPC',
                    rpa: 'RPA',
                    rpm: 'RPM'
                }
            }
        },
        ru: {
            interface: {
                table: {
                    clicks_revenue: 'Доход',
                    approved_revenue: 'Доход',
                    total_revenue: 'Доход',
                    pending_revenue: 'Доход',
                    rejected_revenue: 'Доход',
                    revenue: 'Доход',
                    rpc: 'RPC',
                    rpa: 'RPA',
                    rpm: 'RPM'
                }
            },
            dashboard_page: {
                legend: {
                    approved_revenue: 'Доход',
                    pending_revenue: 'Доход',
                    clicks_revenue: 'Доход',
                    total_revenue: 'Доход',
                    rejected_revenue: 'Доход',
                    rpc: 'RPC',
                    rpa: 'RPA',
                    rpm: 'RPM'
                }
            }
        }
    };
}
