import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ReportFilterFilterEnum, ReportFilterOutputModel } from '@scaleo/reports/shared/filters/common';

import { ReportFiltersOutputValueService } from '../../services/report-filters-output-value.service';
import { ReportFilterQuery } from '../../state/report-filter.query';

@Component({
    selector: 'app-report-output-filters-selected',
    template: `
        <app-report-output-filter-selected
            *ngFor="let item of selectedFiltersList"
            [title]="'reports_page.filters.' + item.key | translate"
            [value]="item.value"
            [key]="item.key"
            (clearFilter)="clearFilter.emit($event)"
            (clearFilterValue)="clearFilterValue.emit($event)"
        ></app-report-output-filter-selected>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class ReportOutputFiltersSelectedComponent implements OnInit {
    @HostBinding('class') hostClass = 'report-output-filters-selected';

    @Input() selectedFiltersList: ReportFilterOutputModel[];

    @Output() clearFilter: EventEmitter<ReportFilterFilterEnum> = new EventEmitter<ReportFilterFilterEnum>();

    @Output() clearFilterValue: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private reportFilters2OutputValueService: ReportFiltersOutputValueService,
        private readonly unsubscribe: UnsubscribeService,
        private reportFilterQuery: ReportFilterQuery
    ) {}

    ngOnInit(): void {
        this.reportFilters2OutputValueService.filters$.pipe(takeUntil(this.unsubscribe), take(1)).subscribe((v) => {
            v.forEach((filter) => {
                const selectedFilter = this.reportFilterQuery.filtersSelected.find((elem2) => elem2.filter === filter.key);
                if (!selectedFilter) {
                    this.reportFilters2OutputValueService.removeFilter(filter.key);
                }

                if (selectedFilter && selectedFilter?.value?.length === 0) {
                    this.reportFilters2OutputValueService.removeFilter(filter.key);
                }
            });
        });
    }
}
