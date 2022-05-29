import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

export type MgcomTopInterface = {
    [key in BreakdownEnum]: string;
} & {
    managers: ShortManagerModel[];
    clicks_for_the_month: number;
    conversions_for_the_month: number;
    clicks_for_the_day: number;
    conversions_for_the_day: number;
    clicks_change_for_the_day: number;
    conversions_change_for_the_day: number;
    // clicks_for_six_hours: number;
    // conversions_for_six_hours: number;
    // clicks_change_for_six_hours: number;
    // conversions_change_for_six_hours: number;
    clicks_for_seven_days: number;
    conversions_for_seven_days: number;
    clicks_change_for_seven_days: number;
    conversions_change_for_seven_days: number;
    critical_change: number;
};

export const tableFirstColForOffer: UiTableHeaderInterface = {
    value: 'offer',
    key: 'offer',
    translateKey: 'table.column.offer',
    colWidth: '15%'
};

export const tableFirstColForAffiliate: UiTableHeaderInterface = {
    value: 'affiliate',
    key: 'affiliate',
    translateKey: 'table.column.affiliate',
    colWidth: '15%'
};

export const tableFirstColForSubId1: UiTableHeaderInterface = {
    value: 'sub_id1',
    key: 'sub_id1',
    translateKey: 'table.column.sub_id1',
    colWidth: '15%'
};

export const tableFirstColFactory = (tab: BreakdownEnum = BreakdownEnum.Offer): UiTableHeaderInterface => {
    switch (tab) {
        case BreakdownEnum.Affiliate:
            return tableFirstColForAffiliate;
        case BreakdownEnum.AffiliateSubId1:
            return tableFirstColForSubId1;
        default:
            return tableFirstColForOffer;
    }
};

export const tableHeadersConfig = (): UiTableHeaderInterface[] => {
    const translateSchema = 'dashboard_grid.widget.mgcom.top.table';
    return [
        tableFirstColFactory(),
        {
            value: 'manager',
            key: 'manager',
            translateKey: 'table.column.manager',
            colWidth: '10%'
        },
        {
            value: 'clicks_for_the_month',
            key: 'clicks_for_the_month',
            translateKey: `${translateSchema}.clicks_for_the_month`,
            sort: true
        },
        {
            value: 'conversions_for_the_month',
            key: 'conversions_for_the_month',
            translateKey: `${translateSchema}.conversions_for_the_month`,
            sort: true
        },
        {
            value: 'clicks_for_seven_days',
            key: 'clicks_for_seven_days',
            translateKey: `${translateSchema}.clicks_for_seven_days`,
            sort: true
        },
        {
            value: 'conversions_for_seven_days',
            key: 'conversions_for_seven_days',
            translateKey: `${translateSchema}.conversions_for_seven_days`,
            sort: true
        },
        {
            value: 'clicks_change_for_seven_days',
            key: 'clicks_change_for_seven_days',
            translateKey: `${translateSchema}.clicks_change_for_seven_days`,
            sort: true
        },
        {
            value: 'conversions_change_for_seven_days',
            key: 'conversions_change_for_seven_days',
            translateKey: `${translateSchema}.conversions_change_for_seven_days`,
            sort: true
        },
        {
            value: 'clicks_for_the_day',
            key: 'clicks_for_the_day',
            translateKey: `${translateSchema}.clicks_for_the_day`,
            sort: true,
            direction: 'desc'
        },
        {
            value: 'conversions_for_the_day',
            key: 'conversions_for_the_day',
            translateKey: `${translateSchema}.conversions_for_the_day`,
            sort: true
        },
        {
            value: 'clicks_change_for_the_day',
            key: 'clicks_change_for_the_day',
            translateKey: `${translateSchema}.clicks_change_for_the_day`,
            sort: true
        },
        {
            value: 'conversions_change_for_the_day',
            key: 'conversions_change_for_the_day',
            translateKey: `${translateSchema}.conversions_change_for_the_day`,
            sort: true
        },
        // {
        //     value: 'clicks_for_six_hours',
        //     key: 'clicks_for_six_hours',
        //     translateKey: `${translateSchema}.clicks_for_six_hours`,
        //     sort: true
        // },
        // {
        //     value: 'conversions_for_six_hours',
        //     key: 'conversions_for_six_hours',
        //     translateKey: `${translateSchema}.conversions_for_six_hours`,
        //     sort: true
        // },
        // {
        //     value: 'clicks_change_for_six_hours',
        //     key: 'clicks_change_for_six_hours',
        //     translateKey: `${translateSchema}.clicks_change_for_six_hours`,
        //     sort: true
        // },
        // {
        //     value: 'conversions_change_for_six_hours',
        //     key: 'conversions_change_for_six_hours',
        //     translateKey: `${translateSchema}.conversions_change_for_six_hours`,
        //     sort: true
        // },
        {
            value: 'critical_change',
            key: 'critical_change',
            translateKey: `${translateSchema}.critical_change`,
            sort: true
        }
    ];
};
