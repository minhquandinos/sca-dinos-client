import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import {
    ReportFilterFilterEnum,
    ReportFilterModel,
    ReportFilterOutputModel,
    ReportFilterUnionType
} from '@scaleo/reports/shared/filters/common';
import { DropdownPopupComponent } from '@scaleo/shared/components';

import { ReportFiltersOutputValueService } from '../../services/report-filters-output-value.service';
import { DynamicFieldDirectiveDirective } from './dynamic-field-directive.directive';

@Component({
    selector: 'app-report-filters-selected',
    templateUrl: './report-filters-selected.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFiltersSelectedComponent implements OnDestroy, AfterViewInit, OnInit {
    @HostBinding('class') hostClass = 'report-filters-selected';

    @Input() set selectedFiltersList(list: ReportFilterModel[]) {
        const selectedList = list.filter((elem) => elem.selected);
        this.initFilterForm(selectedList);
        this.selectedFilters = selectedList;
    }

    @Output() changeFilterValue: EventEmitter<ReportFilterModel> = new EventEmitter<ReportFilterModel>();

    @ViewChildren(DropdownPopupComponent) private dropdownPopupComponents: QueryList<DropdownPopupComponent>;

    @ViewChildren(DynamicFieldDirectiveDirective)
    private fieldDirectiveDirective: QueryList<DynamicFieldDirectiveDirective>;

    public selectedFilters: ReportFilterModel[];

    public filterForm: FormGroup;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder, private filters2OutputValueService: ReportFiltersOutputValueService) {
        this.filterForm = this.formBuilder.group({});
    }

    ngOnInit(): void {
        this.filters2OutputValueService.clear();
    }

    ngAfterViewInit(): void {
        this.fieldDirectiveDirective.forEach((directive) => {
            this.initialSelected(directive);
            this.toggleOriginal(directive);
        });

        this.fieldDirectiveDirective.changes.pipe(takeUntil(this.unsubscribe)).subscribe((list) => {
            list.forEach((directive: any) => {
                this.initialSelected(directive);
                this.toggleOriginal(directive);
            });
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public applyFilterHandler(filter: ReportFilterModel) {
        const key: ReportFilterUnionType = filter.filter;
        const value = this.filterForm.getRawValue()[key];

        this.changeFilterValue.emit({
            ...filter,
            value
        });

        this.filters2OutputValueService.setValue(value, filter.filter);
    }

    private initFilterForm(filters: ReportFilterModel[]) {
        filters?.forEach((item: ReportFilterModel) => {
            const filter = item.filter;
            if (!this.filterForm.get(filter)) {
                this.filterForm.addControl(filter, new FormControl(item.value || null));
            } else {
                this.filterForm.patchValue({
                    [filter]: item.value
                });
            }
        });
    }

    public checkSelectedFilter(filter: ReportFilterModel) {
        const filterHaveDrop = this.dropdownPopupComponents.some(
            (el: DropdownPopupComponent) => (el.dropdownId as ReportFilterFilterEnum) === filter.filter
        );
        if (filterHaveDrop) {
            this.openDrop(filter);
        } else {
            this.openNewFilter(filter);
        }
    }

    private openNewFilter(filter: ReportFilterModel) {
        this.dropdownPopupComponents?.changes
            .pipe(delay(500), takeUntil(this.unsubscribe))
            .subscribe((dropdownPopupComponents: DropdownPopupComponent[]) => {
                if (filter) {
                    this.openDrop(filter, dropdownPopupComponents);
                    filter = null;
                }
            });
    }

    private openDrop(filter: ReportFilterModel, drops?: DropdownPopupComponent[]) {
        const dropdownPopupComponents = drops || this.dropdownPopupComponents;

        const dropdown: DropdownPopupComponent = dropdownPopupComponents.find((el) => el.dropdownId === filter.filter);

        if (dropdown) {
            // TODO change app-dropdown-popup for app-entity-dropdown
            setTimeout(() => {
                dropdown.dropdownDirective.openDropdown();
            }, 0);
        }
    }

    trackByFn(index: number, item: any): number | string {
        return item?.key || index;
    }

    filterValues(event: ReportFilterOutputModel) {
        this.filters2OutputValueService.setAllFilters(event);
    }

    private initialSelected(directive: DynamicFieldDirectiveDirective) {
        directive.component.instance?.initialSelected?.pipe(takeUntil(this.unsubscribe)).subscribe((values: any) => {
            this.filterValues({
                value: values,
                key: directive.selectedFilters.filter
            });
            this.filters2OutputValueService.setValue(
                this.filterForm.getRawValue()[directive.selectedFilters.filter],
                directive.selectedFilters.filter
            );
        });
    }

    private toggleOriginal(directive: DynamicFieldDirectiveDirective) {
        directive.component.instance?.toggleFull?.pipe(takeUntil(this.unsubscribe)).subscribe((values: any) => {
            this.filterValues({
                value: values,
                key: directive.selectedFilters.filter
            });
        });
    }
}
