import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ReportFilterFilterEnum, ReportFilterModel, ReportFiltersInterface } from '@scaleo/reports/shared/filters/common';
import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ReportFiltersSelectedComponent } from './components/report-filters-selected/report-filters-selected.component';
import { ReportFiltersOutputValueService } from './services/report-filters-output-value.service';
import { ReportFilterQuery } from './state/report-filter.query';
import { ReportFilterService } from './state/report-filter.service';
import { ReportFilterStore } from './state/report-filter.store';

// TODO refactor all component and services
@Component({
    selector: 'app-report-filters',
    templateUrl: './report-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReportFilterStore, ReportFilterService, ReportFilterQuery, ReportFiltersOutputValueService, UnsubscribeService]
})
export class ReportFiltersComponent implements OnInit {
    @HostBinding('class') hostClass = 'report-filters d-flex flex-column';

    @Input() set config(config: ReportFilterModel[]) {
        if (config) {
            // this.service.setInitSelectedFilters(config);
            // this.service.showAddFilterButton$.next(false);
        }
    }

    @Input() set filterList(value: ReportFiltersInterface[]) {
        if (value) {
            this.reportFilterService.update({ list: value });
        }
    }

    @Input() set filtersSelected(value: ReportFilterModel[]) {
        if (value) {
            this.reportFilterService.update({ selectedList: value });
        }
    }

    @Output()
    changeSelFiltersValue: EventEmitter<RequestPayloadFilter2Interface> = new EventEmitter<RequestPayloadFilter2Interface>();

    @Output() changedFilters: EventEmitter<ReportFilterModel[]> = new EventEmitter<ReportFilterModel[]>();

    @ViewChild(ReportFiltersSelectedComponent) readonly reportFiltersSelectedComponent: ReportFiltersSelectedComponent;

    readonly filterList$: Observable<ReportFiltersInterface[]> = this.reportFilterQuery.select('list');

    readonly filtersSelected$ = this.reportFilterQuery.select('selectedList');

    readonly filtersSelectedOutput$ = this.filters2OutputValueService.filters$;

    constructor(
        private filters2OutputValueService: ReportFiltersOutputValueService,
        private readonly reportFilterService: ReportFilterService,
        private readonly reportFilterQuery: ReportFilterQuery,
        private cdr: ChangeDetectorRef,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.filters2OutputValueService.filters$.pipe(delay(300), takeUntil(this.unsubscribe)).subscribe(() => {
            this.cdr.detectChanges();
        });
    }

    selectedFilter(filter: ReportFilterModel): void {
        this.changedFilters.emit([...this.reportFilterQuery.filtersSelected, filter]);
        this.reportFiltersSelectedComponent.checkSelectedFilter(filter);
    }

    removeFilter(filter: ReportFilterModel): void {
        this.changedFilters.emit(this.reportFilterService.removeFilter(filter));
        this.filters2OutputValueService.removeFilter(filter.filter);
    }

    savedFilter(newFilter: ReportFilterModel): void {
        this.changedFilters.emit(this.reportFilterService.savedFilters(newFilter));
    }

    filterValueWasChanged(event: ReportFilterModel): void {
        this.changedFilters.emit(this.reportFilterService.updateFilterValue(event));
    }

    clearFilterValue(event: { key: ReportFilterFilterEnum; deleteKey: number | string }): void {
        this.changedFilters.emit(this.reportFilterService.clearFilterValue(event.key, event.deleteKey));
    }

    clearFilter(event: ReportFilterFilterEnum): void {
        this.changedFilters.emit(this.reportFilterService.clearFilter(event));
    }
}
