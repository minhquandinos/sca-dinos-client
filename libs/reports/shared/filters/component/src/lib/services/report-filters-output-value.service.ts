import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import {
    REPORT_FILTER,
    ReportFilterOutputModel,
    ReportFilterOutputType,
    ReportFilterUnionType,
    ReportFilterValueType
} from '@scaleo/reports/shared/filters/common';

@Injectable()
export class ReportFiltersOutputValueService {
    private _allFilters$: BehaviorSubject<ReportFilterOutputType> = new BehaviorSubject<ReportFilterOutputType>({});

    readonly allFilters$ = this._allFilters$.asObservable();

    private _filters$: BehaviorSubject<ReportFilterOutputModel[]> = new BehaviorSubject<ReportFilterOutputModel[]>([]);

    readonly filters$ = this._filters$.asObservable().pipe(
        map((filters) => filters.filter((filter) => filter.value?.length > 0)),
        shareReplay()
    );

    private static filterIncrementKey(filterKey: ReportFilterUnionType): string {
        switch (filterKey) {
            case REPORT_FILTER.paidToAffiliate:
                return 'status';
            default:
                return 'id';
        }
    }

    get filtersValue(): ReportFilterOutputModel[] {
        return this._filters$.value;
    }

    private setFilters(value: ReportFilterOutputModel[]): void {
        this._filters$.next(value);
    }

    private prepareValue(formValue: number[] | string[] | string, filterKey: ReportFilterUnionType): ReportFilterValueType[] {
        // for textarea filters
        if ((this.allFilters[filterKey] === null || this.allFilters[filterKey]) && typeof formValue === 'string') {
            if (formValue?.length > 0) {
                return formValue?.split('\n').map((val) => ({
                    title: val,
                    id: val
                }));
            }
            return [];
        }

        return this.allFilters[filterKey]?.filter((v) => {
            const key = ReportFiltersOutputValueService.filterIncrementKey(filterKey);
            const id = (v as any)?.[key] as never;
            if (typeof v === 'object' && (id || id === 0)) {
                return formValue.includes(id);
            }

            if (typeof v === 'string') {
                return formValue.includes(v as never);
            }

            return false;
        });
    }

    setValue(formValue: number[] | string[] | string, key: ReportFilterUnionType) {
        this.updateValue({
            key,
            value: this.prepareValue(formValue, key)
        });
    }

    private updateValue(newFilter: ReportFilterOutputModel) {
        if (this.filtersValue.find((filter) => filter.key === newFilter.key)) {
            this.setFilters([
                ...this.filtersValue.map((filter) => {
                    if (filter.key === newFilter.key) {
                        return {
                            ...filter,
                            value: newFilter.value
                        };
                    }
                    return filter;
                })
            ]);
        } else {
            this.setFilters([...this.filtersValue, newFilter]);
        }
    }

    removeFilter(filterKey: ReportFilterUnionType) {
        this.setFilters([...this.filtersValue.filter((filter) => filter.key !== filterKey)]);
    }

    removeFilterValue(filterKey: ReportFilterUnionType, remove: number | string) {
        this.setFilters([
            ...this.filtersValue.map((elem) => {
                if (elem.key === filterKey) {
                    return {
                        ...elem,
                        value: (elem.value as any).filter(
                            (value: any) => value[ReportFiltersOutputValueService.filterIncrementKey(filterKey)] !== remove
                        )
                    };
                }
                return elem;
            })
        ]);
    }

    get allFilters(): ReportFilterOutputType {
        return this._allFilters$.value;
    }

    setAllFilters(newFilter: ReportFilterOutputModel): void {
        this._allFilters$.next({
            ...this.allFilters,
            [newFilter.key]: newFilter.value
        });
    }

    clear(): void {
        this._filters$.next([]);
    }
}
