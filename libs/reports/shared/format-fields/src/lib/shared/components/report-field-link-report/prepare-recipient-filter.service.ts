import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { RelationReportModel } from '@scaleo/reports/shared/format-fields';
import { ReportsService } from '@scaleo/reports/state';
import { ReportStatisticsRelationLinkBuilder } from '@scaleo/reports/statistic/common';

@Injectable()
export class PrepareRecipientFilterService {
    private _data!: RelationReportModel;

    constructor(private readonly router: Router, private readonly reportsService: ReportsService) {}

    set(data: RelationReportModel): this {
        this._data = data;
        return this;
    }

    toReport(): void {
        const { path } = this._data;
        const { filters, rangeFrom, rangeTo } = this.makeRecipientFilter;

        this.router.navigate([path], { queryParams: { rangeFrom, rangeTo, ...filters } });
    }

    private get makeRecipientFilter(): {
        filters: Partial<ReportFiltersDtoModel>;
        rangeFrom: string;
        rangeTo: string;
    } {
        const { breakdown, item, filterData, newFilters } = this._data;

        const builder = new ReportStatisticsRelationLinkBuilder(breakdown, item, filterData, newFilters);

        const { rangeFrom, rangeTo } = builder.date() || {};

        const filters = builder.filters();

        return {
            filters,
            rangeFrom,
            rangeTo
        };
    }
}
