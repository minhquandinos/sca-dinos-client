import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ShortResponseInterface, StatusType } from '@scaleo/core/data';
import { BaseListItemsService } from '@scaleo/core/state/list-items-state';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { PlatformListsInterface } from '@scaleo/platform/list/access-data';
import { GetFilterInterface } from '@scaleo/shared/services/filters';

import { BaseListStaticFiltersEnum, BaseListStaticFiltersType } from './models/base-list-static.filters.model';

// TODO remove BaseListItemsService to BaseStateService
@Component({ template: '' })
export abstract class BaseListStaticFiltersComponent<T extends BaseListItemsService<T>> {
    @Input() set params(params: GetFilterInterface) {
        this.filterParams.next(params);
    }

    @Input() totals: number;

    @Input() platformLists: PlatformListsInterface;

    public pathPage: string;

    public filterForm: FormGroup;

    public selectedAnyFilters: boolean;

    public filterParams: BehaviorSubject<GetFilterInterface> = new BehaviorSubject<GetFilterInterface>(null);

    public readonly baseFiltersEnum = BaseListStaticFiltersEnum;

    private _exceptFilters: string | string[] = 'status';

    protected constructor(@Inject('service') protected service: T, protected fomBuilder: FormBuilder, protected route: ActivatedRoute) {
        this.pathPage = this.route.snapshot.routeConfig.path;
    }

    protected checkSelectedAnyFilter(): void {
        this.selectedAnyFilters = this.selectedAnyFilter(this.filterForm?.value);
    }

    protected set exceptFilters(value: string | string[]) {
        this._exceptFilters = value;
    }

    public setFilterStatus(status: StatusType): void {
        this.service.updateParams({ status }, true);
    }

    public searching(search: string): void {
        this.service.updateParams({ search });
    }

    public applyFilter(): void {
        this.service.updateParams(this.filterForm.value, true);
        this.checkSelectedAnyFilter();
    }

    public clearFilter(type: BaseListStaticFiltersType, event): void {
        this.filterForm.patchValue({
            [type]: event
        });
        this.service.updateParams(this.filterForm.value, true);
        this.checkSelectedAnyFilter();
    }

    selectedAnyFilter(filters: unknown[]): boolean {
        return Object.keys(filters)
            .filter((element) => {
                if (Array.isArray(this._exceptFilters)) {
                    return !this._exceptFilters.includes(element);
                }

                return element !== this._exceptFilters;
            })
            .some((element) => (filters[element] && filters[element].length > 0) === true);
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
