import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

const customBreakdown = (diffDays: number): BreakdownEnum => {
    switch (true) {
        case diffDays === 0:
            return BreakdownEnum.Hour;
        case diffDays >= 60:
            return BreakdownEnum.Month;
        default:
            return BreakdownEnum.Day;
    }
};

const rangeBreakdown = (selectedRange: CustomDateRangeTitleEnum): BreakdownEnum => {
    let breakdown: BreakdownEnum;
    switch (selectedRange) {
        case CustomDateRangeTitleEnum.Last14Days:
        case CustomDateRangeTitleEnum.Last7Days:
        case CustomDateRangeTitleEnum.Last30Days:
        case CustomDateRangeTitleEnum.Last90Days:
        case CustomDateRangeTitleEnum.LastMonth:
        case CustomDateRangeTitleEnum.ThisMonth:
        default:
            breakdown = BreakdownEnum.Day;
            break;
        case CustomDateRangeTitleEnum.ThisYear:
            breakdown = BreakdownEnum.Month;
            break;
        case CustomDateRangeTitleEnum.Today:
        case CustomDateRangeTitleEnum.Yesterday:
            breakdown = BreakdownEnum.Hour;
            break;
    }
    return breakdown;
};

export const getBreakdownByRange = ({ selectedRange, diffDays }: CustomDateRangeModel): BreakdownEnum => {
    if (selectedRange === CustomDateRangeTitleEnum.Custom) {
        return customBreakdown(diffDays);
    }

    return rangeBreakdown(selectedRange);
};
