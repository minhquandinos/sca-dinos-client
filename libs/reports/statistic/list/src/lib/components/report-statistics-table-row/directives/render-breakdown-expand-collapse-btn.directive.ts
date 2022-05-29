import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { StatisticDefaultRowModel, StatisticModel } from '@scaleo/reports/common';
import { ReportFieldsMap } from '@scaleo/reports/shared/format-fields';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { NewReportStatisticsBreakdownService } from '../../../state';

@Directive({
    selector: '[appRenderBreakdownExpandCollapseBtn]'
})
export class RenderBreakdownExpandCollapseBtnDirective implements OnInit {
    @Input() itemValue: StatisticModel | StatisticDefaultRowModel;

    @Input() itemColumn: BreakdownEnum;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private breakdownService: NewReportStatisticsBreakdownService
    ) {}

    ngOnInit(): void {
        if (
            this.column !== null &&
            this.itemColumn &&
            this.breakdownService.nextBreakdown(this.itemColumn) &&
            this.breakdownService.breakdowns.some((item) => item.breakdown === this.itemColumn)
        ) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    get realKey(): string {
        return ReportFieldsMap.getKeyField(this.itemColumn);
    }

    private get isItemObject(): boolean {
        if (typeof this.column === 'object') {
            return this.column.id !== 0 && !!this.column.value && !!this.column.id;
        }

        return true;
    }

    private get isItemString(): boolean {
        if (typeof this.column === 'string') {
            return !!this.column && +this.column !== 0;
        }

        return true;
    }

    private get column(): string | StatisticDefaultRowModel {
        return (this.itemValue as any)?.[this.realKey] && this.realKey ? (this.itemValue as any)?.[this.realKey] : undefined;
    }
}
