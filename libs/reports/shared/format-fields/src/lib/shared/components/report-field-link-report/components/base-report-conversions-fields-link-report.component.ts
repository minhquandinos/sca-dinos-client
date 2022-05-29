import { Component } from '@angular/core';

import { ReportFilterFilterEnum, ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService } from '@scaleo/shared/components';

import { PrepareRecipientFilterService } from '../prepare-recipient-filter.service';
import { BaseReportFieldLinkReportComponent } from './base-report-field-link-report.component';

@Component({ template: '' })
export abstract class BaseReportConversionsFieldsLinkReportComponent extends BaseReportFieldLinkReportComponent {
    abstract linkPermission: string;

    private _conversionStatusValues: number[];

    protected constructor(
        protected navigateRootService: NavigateRootService,
        protected prepareRecipientFilterService: PrepareRecipientFilterService
    ) {
        super();
    }

    abstract get conversionStatusValues(): number[];

    setConversionStatusValues(value: number[]) {
        this._conversionStatusValues = value;
    }

    protected toReport(): void {
        this.prepareRecipientFilterService
            .set({
                path: this.navigateRootService.path('/transactions/conversions'),
                breakdown: this.breakdown,
                item: this._item,
                filterData: this.filterData,
                newFilters: this.buildConversionStatusFilters
            })
            .toReport();
    }

    private get buildConversionStatusFilters(): Partial<ReportFiltersDtoModel> {
        return {
            [ReportFilterFilterEnum.ConversionStatus]: this._conversionStatusValues.join(',')
        };
    }
}
