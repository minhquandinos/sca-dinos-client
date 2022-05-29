import { Injectable } from '@angular/core';

import { BaseStateService } from '@scaleo/core/state/state';
import { ReportFilterFilterEnum, ReportFilterModel } from '@scaleo/reports/shared/filters/common';

import { ReportFilterQuery } from './report-filter.query';
import { ReportFilterState, ReportFilterStore } from './report-filter.store';

@Injectable()
export class ReportFilterService extends BaseStateService<ReportFilterState> {
    constructor(protected store: ReportFilterStore, protected query: ReportFilterQuery) {
        super(store, query);
    }

    clearFilter(filterKey: ReportFilterFilterEnum): ReportFilterModel[] {
        return this.query.filtersSelected.map((elem) => {
            if (elem.filter === filterKey) {
                return {
                    ...elem,
                    value: Array.isArray(elem.value) ? [] : ''
                };
            }
            return elem;
        });
    }

    clearFilterValue(filterKey: ReportFilterFilterEnum, deleteValue: string | number): ReportFilterModel[] {
        return this.query.filtersSelected.map((elem) => {
            if (elem.filter === filterKey) {
                if (typeof elem.value === 'string') {
                    const arr = elem.value.split('\n');
                    const removed = arr.filter((val) => val !== deleteValue);
                    return {
                        ...elem,
                        value: removed.join('\n')
                    };
                }

                if (Array.isArray(elem.value)) {
                    return {
                        ...elem,
                        value: (elem.value as any).filter((value: any) => value !== deleteValue)
                    };
                }
            }
            return elem;
        });
    }

    updateFilterValue(newFilter: ReportFilterModel): ReportFilterModel[] {
        let newFilterSelected: ReportFilterModel[] = [];

        const filtersSelected = this.query.filtersSelected;
        const index = filtersSelected.findIndex((flt) => flt.filter === newFilter.filter);
        if (index !== -1) {
            newFilterSelected = filtersSelected.map((elem) => {
                if (elem.filter === newFilter.filter) {
                    return newFilter;
                }
                return elem;
            });
        } else {
            newFilterSelected = [...filtersSelected, newFilter];
        }

        return newFilterSelected;
    }

    savedFilters(newFilter: ReportFilterModel): ReportFilterModel[] {
        const filterSelected = this.query.filterSelected(newFilter.filter);
        const filtersSelected = this.query.filtersSelected;

        const value = newFilter.value || [];
        if (value.length === 0 && filterSelected && !newFilter.isSaved) {
            return filtersSelected.filter((elem) => elem.filter !== newFilter.filter);
        }
        if (!filterSelected) {
            return [...filtersSelected, newFilter];
        }
        return filtersSelected.map((elem) => {
            if (elem.filter === newFilter.filter) {
                return {
                    ...elem,
                    isSaved: newFilter.isSaved
                };
            }
            return elem;
        });
    }

    removeFilter(filter: ReportFilterModel): ReportFilterModel[] {
        const filterSelected = this.query.filterSelected(filter.filter);
        const filtersSelected = this.query.filtersSelected;

        // const selectedFilter = this.filterSelected(filter.filterKey);
        if (filterSelected?.isSaved) {
            return filtersSelected.map((elem) => {
                if (elem.filter === filter.filter) {
                    return {
                        ...elem,
                        selected: !elem.selected
                    };
                }
                return elem;
            });
        }

        return filtersSelected.filter((elem) => elem.filter !== filter.filter);
    }
}
