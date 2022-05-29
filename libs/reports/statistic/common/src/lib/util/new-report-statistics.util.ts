import { BreakdownEnum } from '@scaleo/reports/statistic/common';

export const isTimeBreakdown = (breakdown: BreakdownEnum): boolean => {
    const breakdownMap = [BreakdownEnum.Day, BreakdownEnum.Hour, BreakdownEnum.Month, BreakdownEnum.Year];
    return breakdownMap.includes(breakdown);
};
