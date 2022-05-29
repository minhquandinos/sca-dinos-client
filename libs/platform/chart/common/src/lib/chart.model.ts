export interface ChartModel extends ChartComparePeriodModel {
    current: DashboardWidgetChartSeriesInterface;
    previous: DashboardWidgetChartSeriesInterface;
}

export interface ChartComparePeriodModel {
    key: string;
    current: ChartComparePeriodSeriesModel;
    previous: ChartComparePeriodSeriesModel;
}

export interface ChartComparePeriodSeriesModel {
    total: number;
    ranges: string[];
    series: number[];
    total_change?: number;
}

export interface DashboardWidgetChartSeriesInterface extends ChartComparePeriodSeriesModel {
    from: number;
    to: number;
}
