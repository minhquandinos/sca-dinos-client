import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FormatPipe } from '@scaleo/platform/format/pipe';
import { ReportFilterFilterEnum, ReportFilterValueType } from '@scaleo/reports/shared/filters/common';
import { OutputSelectedFiltersModel } from '@scaleo/shared/components';

import { ReportOutputDataFilterTransform } from '../../classes/report-output-data-filter-transform';
import { ReportFiltersOutputValueService } from '../../services/report-filters-output-value.service';

@Component({
    selector: 'app-report-output-filter-selected',
    template: `
        <app-output-selected-filters
            [title]="title"
            [showImage]="true"
            [selected]="_value"
            (clear)="clearFilterHandler($event)"
            (remove)="clearFilterValueHandler($event)"
            sliceCounter="6"
        ></app-output-selected-filters>
    `,
    providers: [FormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportOutputFilterSelectedComponent implements OnInit {
    @Input() title: string;

    @Input() value: ReportFilterValueType[];

    _value: OutputSelectedFiltersModel[] = [];

    @Output() clearFilter: EventEmitter<ReportFilterFilterEnum> = new EventEmitter<ReportFilterFilterEnum>();

    @Output() clearFilterValue: EventEmitter<{
        key: ReportFilterFilterEnum;
        deleteKey: number | string;
    }> = new EventEmitter<{ key: ReportFilterFilterEnum; deleteKey: number | string }>();

    @Input() key: ReportFilterFilterEnum;

    constructor(
        private formatPipe: FormatPipe,
        private readonly cdr: ChangeDetectorRef,
        private translateService: TranslateService,
        private reportFilters2OutputValueService: ReportFiltersOutputValueService
    ) {}

    ngOnInit(): void {
        this.transformValue();
    }

    clearFilterHandler(status: boolean): void {
        if (status) {
            this.clearFilter.emit(this.key);
            this.reportFilters2OutputValueService.removeFilter(this.key);
        }
    }

    clearFilterValueHandler(remove: string | number): void {
        this.clearFilterValue.emit({ key: this.key, deleteKey: remove });
        this.reportFilters2OutputValueService.removeFilterValue(this.key, remove);
    }

    private transformValue(): void {
        const transform = new ReportOutputDataFilterTransform(this.key, this.value, this.formatPipe, this.translateService);
        this._value = transform.transform();
        this.cdr.detectChanges();
    }
}
