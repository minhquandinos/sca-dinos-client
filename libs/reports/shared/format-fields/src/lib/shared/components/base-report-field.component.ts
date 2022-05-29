import { Component, Input } from '@angular/core';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReportType, StatisticDefaultRowModel, StatisticModel } from '@scaleo/reports/common';
import { ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { ReportStatisticsBreakdownFieldMap } from '../../../../../../statistic/common/src/lib/report-statistics-breakdown-field-map';

@Component({ template: '' })
export class BaseReportFieldComponent<T = unknown | StatisticDefaultRowModel> {
    @Input() key: string;

    @Input() isBreakdown: boolean;

    @Input() set item(value: StatisticModel) {
        if (value) {
            this.transformDefaultField(value);
            this._item = value;
        }
    }

    @Input() reportType: ReportType;

    @Input() isTotals: boolean;

    @Input() filterData: ReportFiltersDtoModel;

    @Input() breakdown: BreakdownEnum;

    @Input() currency: CurrencyEnum;

    _item: StatisticModel;

    field: T;

    setField(value: T) {
        this.field = value;
    }

    protected get fieldByKey(): string {
        return this.isBreakdown ? ReportStatisticsBreakdownFieldMap.breakdownField(this.key) : this.key;
    }

    private transformDefaultField(value: T | unknown): void {
        const field = (value as any)?.[this.fieldByKey];

        if (typeof field === 'string' || typeof field === 'number') {
            this.setField({
                value: field
            } as any);
        }

        if (typeof field === 'object') {
            this.setField(field);
        }
    }
}
