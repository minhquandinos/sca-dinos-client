import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';

import { BaseObjectModel, ShortResponseInterface } from '@scaleo/core/data';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { SelectChangeModel } from '@scaleo/shared/components/select';

// TODO remove BaseListItemsService to BaseStateService
@Component({ template: '' })
export abstract class BaseListStaticFilters2Component<T extends BaseEntityService<T>, Q extends BaseObjectModel, F extends string> {
    @Input() set params(params: Q) {
        this._filterParams$.next(params);
    }

    @Input() totals: number;

    @Input() pathPage: string;

    public filterForm: FormGroup;

    public selectedAnyFilters: boolean;

    selectedAnyFilters$ = of(false);

    private _filterParams$: BehaviorSubject<Q> = new BehaviorSubject<Q>(null);

    readonly filterParams$ = this._filterParams$.asObservable();

    private _exceptFilters: string | string[] = 'status';

    protected constructor(@Inject('service') protected service: T, protected fomBuilder: FormBuilder, protected cdr: ChangeDetectorRef) {}

    get filterParams(): Q {
        return this._filterParams$.value;
    }

    protected checkSelectedAnyFilter(): void {
        this.selectedAnyFilters = this.selectedAnyFilter(this.filterForm?.value);
    }

    protected get exceptFilters(): string | string[] {
        return this._exceptFilters;
    }

    protected set exceptFilters(value: string | string[]) {
        this._exceptFilters = value;
    }

    setFilterStatus(status: SelectChangeModel): void {
        this.service.updateParamsValue({ status: status?.newValue } as any);
    }

    applyFilter(): void {
        this.service.updateParamsValue({ ...this.filterForm.value });
        this.checkSelectedAnyFilter();
    }

    clearFilter(filterName: F): void {
        this.filterForm.patchValue({
            [filterName]: []
        });
        this.service.updateParamsValue({
            [filterName]: []
        } as any);
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }

    removeFilter(filterName: F, incrementValue: string | number) {
        const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
        this.filterForm.patchValue({
            [filterName]: newValue
        });
        this.service.updateParamsValue({
            [filterName]: newValue
        } as any);
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }

    selectedAnyFilter(filters: unknown[]): boolean {
        return Object.keys(filters)
            .filter((element: any) => {
                if (Array.isArray(this._exceptFilters)) {
                    return !this._exceptFilters.includes(element);
                }

                return element !== this._exceptFilters;
            })
            .some((element) => ((filters as any)?.[element] && (filters as any)?.[element].length > 0) === true);
    }

    protected transformTitleForOutputSelectedFilters(items: ShortResponseInterface[], formatPipe: FormatPipe): ShortResponseInterface[] {
        if (!items) {
            return [];
        }
        return items.map((item) => ({
            ...item,
            title: formatPipe.transform(`${item.id} ${item.title}`, 'idName')
        }));
    }
}
