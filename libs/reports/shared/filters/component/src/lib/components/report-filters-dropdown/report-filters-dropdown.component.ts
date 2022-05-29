import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

import { ReportFilterFilterEnum, ReportFilterModel, ReportFiltersInterface } from '@scaleo/reports/shared/filters/common';
import { DropdownEntityComponent } from '@scaleo/ui-kit/components/dropdown-entity';
import { EntityListComponent } from '@scaleo/ui-kit/elements';

import { ReportFilterQuery } from '../../state/report-filter.query';

@Component({
    selector: 'app-report-filters-dropdown',
    templateUrl: './report-filters-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ReportFiltersDropdownComponent {
    @Input() filtersList: ReportFiltersInterface[];

    public searchText: string;

    activeIconColor = '#45484F';

    inactiveIconColor = '#B9C6D2';

    @Output() selectedFilter: EventEmitter<ReportFilterModel> = new EventEmitter<ReportFilterModel>();

    @Output() removedFilter: EventEmitter<ReportFilterModel> = new EventEmitter<ReportFilterModel>();

    @Output() savedFilter: EventEmitter<ReportFilterModel> = new EventEmitter<ReportFilterModel>();

    @HostBinding('class') hostClass = 'report-filters-dropdown';

    @ViewChild('entityList') entityList: EntityListComponent;

    @ViewChild('dropdownEntity') set dropdownEntity(component: DropdownEntityComponent) {
        if (component) {
            this._dropdownEntity = component;
        }
    }

    public _dropdownEntity: DropdownEntityComponent;

    constructor(private readonly reportFilterQuery: ReportFilterQuery) {}

    public searching(search?: string) {
        this.searchText = search;
    }

    public selectFilter(filterName: ReportFilterFilterEnum) {
        const selectedFilter = this.reportFilterQuery.filterSelected(filterName);
        // const selectedFilter = this.filters2FormValueService.filterSelected(filterName);
        if (!selectedFilter) {
            this.selectedFilter.emit(selectedFilter || { filter: filterName, selected: true });
        } else {
            this.removedFilter.emit(selectedFilter);
        }
        this._dropdownEntity.close();
    }

    public trackByFn(index: number): number {
        return index;
    }

    public dropdownStatus(show: boolean) {
        if (!show) {
            this.entityList.customSearchComponent.clear();
        }
    }

    public saveFilter(filterName: ReportFilterFilterEnum) {
        const selectedFilter = this.reportFilterQuery.filterSelected(filterName);
        // const selectedFilter = this.filters2FormValueService.filterSelected(filterName);

        if (selectedFilter) {
            this.savedFilter.emit({
                ...selectedFilter,
                selected: !selectedFilter.selected,
                isSaved: !selectedFilter.isSaved
            });
        } else {
            this.savedFilter.emit({ filter: filterName, isSaved: true, selected: true });
        }

        // this._dropdownEntity.close();
        this._dropdownEntity.calcDropPosition();
    }
}
