import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';

export abstract class BaseCompareMetricChart {
    protected chart: Chart;

    protected constructor(protected chartComponent: ChartComparePeriodComponent, protected dateRange: CustomDateRangeModel) {
        this.chart = chartComponent.chart;
    }

    protected setCategories(categories: ChartModel) {
        this.chart.ref.xAxis[0].setCategories(this.setCategoriesByRange(categories));
    }

    private setCategoriesByRange(data: ChartModel): string[] {
        if (this.dateRange.selectedRange === CustomDateRangeTitleEnum.Today) {
            const today = data.current.ranges[0].split(' ').shift();
            return data.previous.ranges.map((date) => {
                const changeDated = date.split(' ');
                changeDated[0] = today;
                return changeDated.join(' ');
            });
        }

        if (this.dateRange.selectedRange === CustomDateRangeTitleEnum.ThisMonth) {
            return this.generateDateRangeForCurrentMonth();
        }

        return data.current.ranges;
    }

    // TODO fixed date when month has diff days
    private generateDateRangeForCurrentMonth(): string[] {
        const ranges: string[] = [];
        const countDayOfCurrentMonth = moment().daysInMonth();
        const countDayOfPreviousMonth = moment().subtract(1, 'months').daysInMonth();
        let countDay = countDayOfCurrentMonth;
        if (countDayOfCurrentMonth < countDayOfPreviousMonth) {
            countDay = countDayOfPreviousMonth;
        }
        Array.from({ length: countDay }, (day, i) => i).forEach((day) => {
            let dayFormat = moment().startOf('month');

            if (day > 0) {
                dayFormat = dayFormat.add(day, 'day');
            }

            // console.log(day, countDayOfCurrentMonth, day > countDayOfCurrentMonth);
            // if (day + 1 > countDayOfCurrentMonth) {
            //     ranges.push(moment().subtract(1, 'months').add(day, 'day').format('YYYY-MM-DD'));
            // } else

            if (dayFormat !== moment().endOf('month')) {
                ranges.push(dayFormat.format('YYYY-MM-DD'));
            }
        });

        return ranges;
    }
}
