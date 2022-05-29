import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ReportPagesEnum, TempFiltersModel } from '@scaleo/reports/common';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';

export interface ReportsState {
    date: CustomDateRangeModel;
    tempFilters: TempFiltersModel;
    donorFilters?: ReportFilterModel[];
}

export const createInitialReportsState = (): ReportsState => ({
    date: {
        rangeFrom: '',
        rangeTo: ''
    },
    tempFilters: {}
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'reports', resettable: true })
export class ReportsStore extends Store<ReportsState> {
    constructor() {
        super(createInitialReportsState());
    }

    updateTempFilters(page: ReportPagesEnum, filters: ReportFilterModel[]) {
        this.update((state) => ({
            ...state,
            tempFilters: {
                [page]: filters
            }
        }));
    }

    updateDate(date: CustomDateRangeModel) {
        this.update((state) => ({
            ...state,
            date: {
                ...state.date,
                rangeFrom: date.rangeFrom,
                rangeTo: date.rangeTo,
                selectedRange: date.selectedRange
            }
        }));
    }

    setDonorFilters(donorFilters: ReportFilterModel[]) {
        this.update((state) => ({
            ...state,
            donorFilters
        }));
    }
}
