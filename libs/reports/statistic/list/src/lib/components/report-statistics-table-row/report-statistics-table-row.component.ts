import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ReportEnum, StatisticModel } from '@scaleo/reports/common';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { AdditionalFieldTemplateInterface } from '@scaleo/reports/shared/format-fields';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsTableService } from '../../services/new-report-statistics-table.service';
import { NewReportStatisticsBreakdownService } from '../../state';
import { ReportStatisticsChildrenService } from './services/report-statistics-children.service';
import { ReportStatisticsChildrenBreakdownService } from './services/report-statistics-children-breakdown.service';
import { ReportStatisticsChildrenCurrentFieldService } from './services/report-statistics-children-current-field.service';
import { ReportStatisticsChildrenDataService } from './services/report-statistics-children-data.service';
import { ReportStatisticsChildrenDateRangeService } from './services/report-statistics-children-date-range.service';
import { ReportStatisticsChildrenFiltersService } from './services/report-statistics-children-filters.service';
import { ReportStatisticsChildrenLoadMoreService } from './services/report-statistics-children-load-more.service';

@Component({
    selector: 'app-report-statistics-table-row',
    templateUrl: './report-statistics-table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ReportStatisticsChildrenService,
        ReportStatisticsChildrenLoadMoreService,
        ReportStatisticsChildrenDateRangeService,
        ReportStatisticsChildrenBreakdownService,
        ReportStatisticsChildrenCurrentFieldService,
        ReportStatisticsChildrenDataService,
        ReportStatisticsChildrenFiltersService
    ]
})
export class ReportStatisticsTableRowComponent implements OnDestroy {
    @Input() reportType: ReportEnum;

    @Input() columns: UiTable2ColumnsModel[] = [];

    @Input() item: StatisticModel;

    @Input() className: string;

    @Input() breakdown: BreakdownEnum;

    @Input() currency: CurrencyEnum;

    @Input()
    set rootFilters(flt: ReportFilterModel[]) {
        if (flt) {
            this._filterData$.next(flt);
        }
    }

    @Input() set filterData(flt: ReportFilterModel[]) {
        if (flt) {
            this._filterData$.next({
                // ...this._filterData$.value,
                ...flt
            });
            this.childrenFiltersService.setParentPayloadFilters({ ...flt });
        }
    }

    /**
     * set parent date for new instance, after open breakdown
     */
    @Input() set dateRange(date: CustomDateRangeModel) {
        if (date) {
            this.childrenDateRangeService.setParentPayloadDate({ ...date });
        }
    }

    @Input()
    additionalItemTemplateCollection: AdditionalFieldTemplateInterface[];

    @HostBinding('class') hostClass = 'd-contents';

    children$ = this.childrenDataService.children$;

    isLoad$ = this.childrenService.isLoad$;

    isOpen$ = this.childrenService.isOpen$;

    isLoadMore$ = this.loadMoreService.isLoad$;

    pagination$ = this.loadMoreService.pagination$;

    parentFilters$ = this.childrenFiltersService.parentFilters$;

    dateRange$ = this.childrenDateRangeService.parentDateRange$;

    breakdown$ = this.childrenBreakdownService.breakdown$;

    breakdownIndex$ = this.childrenBreakdownService.breakdown$.pipe(
        switchMap((breakdown) => this.breakdownService.breakdownIndex$(breakdown))
    );

    private _filterData$: BehaviorSubject<ReportFilterModel[]> = new BehaviorSubject<ReportFilterModel[]>([]);

    readonly filterData$ = this._filterData$.asObservable();

    children: StatisticModel[];

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private childrenService: ReportStatisticsChildrenService,
        private breakdownService: NewReportStatisticsBreakdownService,
        private loadMoreService: ReportStatisticsChildrenLoadMoreService,
        private statisticsTableService: NewReportStatisticsTableService,
        private childrenDateRangeService: ReportStatisticsChildrenDateRangeService,
        private childrenBreakdownService: ReportStatisticsChildrenBreakdownService,
        private childrenFiltersService: ReportStatisticsChildrenFiltersService,
        private childrenDataService: ReportStatisticsChildrenDataService
    ) {}

    ngOnDestroy(): void {
        this.breakdownService.removeBreakdownFromColumns(this.item.id);
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    trackByFn(index: number): number {
        return index;
    }

    toggle(currentBreakdown: BreakdownEnum): void {
        this.childrenService.switchIsLoad();
        if (!this.childrenService.isOpen) {
            const nextBreakdown = this.breakdownService.nextBreakdown(currentBreakdown);
            this.childrenBreakdownService.setBreakdown(currentBreakdown, nextBreakdown, this.item);

            if (nextBreakdown) {
                this.childrenDataService
                    .setChildrenData()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe((rows) => {
                        rows.forEach((row) => {
                            this.breakdownService.addBreakdownToColumns(row.id, nextBreakdown);
                        });
                        this.childrenService.switchIsOpen();
                        this.childrenService.switchIsLoad();
                        this.statisticsTableService.update();
                    });
            }
        } else {
            this.childrenService.clear();
            this.statisticsTableService.update();
        }
    }

    loadMore(): void {
        const { nextPage } = this.loadMoreService;
        this.loadMoreService.switchIsLoad();
        this.childrenDataService
            .setChildrenData(nextPage)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.loadMoreService.switchIsLoad();
            });
    }
}
