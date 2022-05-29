import { ChartComparePeriodSeriesModel } from '@scaleo/platform/chart/common';

export interface TableConversionSeriesModel extends ChartComparePeriodSeriesModel {
    total: number;
    ranges: string[];
    series: number[];
    total_change?: number;
}

export interface TableConversionLiveStatsModel {
    key: string;
    current?: TableConversionSeriesModel;
    previous?: TableConversionSeriesModel;
}
