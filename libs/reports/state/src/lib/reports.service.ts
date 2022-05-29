import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';

import { ReportsQuery } from './reports.query';
import { ReportsStore } from './reports.store';

@Injectable({ providedIn: 'root' })
export class ReportsService {
    private _manualReset: boolean;

    constructor(private store: ReportsStore, private query: ReportsQuery, private route: ActivatedRoute) {
        route.queryParams
            .pipe(
                filter((queryParams) => !!queryParams),
                tap((queryParams) => {
                    if (queryParams?.['rangeFrom'] || queryParams?.['rangeTo']) {
                        this.store.updateDate({
                            rangeFrom: queryParams?.['rangeFrom'] || this.query.getValue().date.rangeFrom,
                            rangeTo: queryParams?.['rangeTo'] || this.query.getValue().date.rangeTo
                        });
                    }
                })
            )
            .subscribe();
    }

    updateDate(date: CustomDateRangeModel): void {
        this.store.updateDate(date);
    }

    get donorFilters(): ReportFilterModel[] {
        return this.query.getValue()?.donorFilters || [];
    }

    clearRecipientFilters(): void {
        this.store.setDonorFilters([]);
    }

    get date$(): Observable<CustomDateRangeModel> {
        return this.query.date$;
    }

    get date(): CustomDateRangeModel {
        return this.query.getValue().date;
    }

    get hasDate(): boolean {
        const { rangeFrom, rangeTo } = this.query.getValue().date;

        return rangeFrom !== '' && rangeTo !== '';
    }

    reset(): void {
        this.store.reset();
    }

    enableManuelReset(): void {
        this._manualReset = true;
    }

    private disableManuelReset(): void {
        this._manualReset = false;
    }

    get manualReset(): boolean {
        return this._manualReset;
    }

    manualResetHandler(): void {
        if (this._manualReset) {
            this.store.reset();
            this.disableManuelReset();
        }
    }
}
