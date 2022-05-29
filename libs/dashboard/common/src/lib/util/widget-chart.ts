import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { DateUtil } from '@scaleo/platform/date/util';

export const replaceDateInDashboardChartFilter = ({ rangeTo, selectedRange }: CustomDateRangeModel): string =>
    selectedRange === CustomDateRangeTitleEnum.ThisYear ? DateUtil.moment().endOf('year').format('YYYY-MM-DD') : rangeTo;

export const transformDashboardChartResponse = (range: CustomDateRangeTitleEnum, data: ChartModel[]): ChartModel[] => {
    if (range === CustomDateRangeTitleEnum.ThisYear) {
        const today = new Date();
        const numberOfMonth = today.getMonth();

        return data.map((metric) => ({
            ...metric,
            current: {
                ...metric.current,
                series: metric.current.series.filter((day, index) => index <= numberOfMonth)
            }
        }));
    }

    return data;
};
