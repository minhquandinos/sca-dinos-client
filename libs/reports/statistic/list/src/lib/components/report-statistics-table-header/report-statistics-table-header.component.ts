import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import {
    UiTable2ColumnDataAttributesModel,
    UiTable2ColumnsModel,
    UiTable2ColumnTooltipModel,
    UiTable2ColumnTooltipTypeEnum,
    UiTableHeaderInterface
} from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-report-statistics-table-header',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportStatisticsTableHeaderComponent implements OnInit, OnDestroy {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() columnsTree$: Observable<UiTableHeaderInterface[]>;

    @Input() breakdownColumnsTree$: Observable<UiTableHeaderInterface[]>;

    columnsLevel1: UiTable2ColumnsModel[] = [];

    columnsLevel2: UiTable2ColumnsModel[] = [];

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef, private platformSettingsQuery: PlatformSettingsQuery) {}

    ngOnInit(): void {
        combineLatest([this.columnsTree$, this.breakdownColumnsTree$])
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe(([columns, breakdowns]) => {
                const newBreakdowns = breakdowns || [];
                const mergeColumns = [...newBreakdowns, ...columns];

                // TODO fix this
                Promise.resolve().then(() => {
                    this.createLevel1Header(mergeColumns);
                    this.createLevel2Header(mergeColumns);
                });
                this.cdr.checkNoChanges();
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    createLevel1Header(columns: UiTableHeaderInterface[]): void {
        this.columnsLevel1 = columns.map((column) => ({
            value: column.value,
            translate: this.alternativeColumnFieldTranslateForFirstLevel(column.value),
            sort: false,
            colspan: column.children.length,
            ...this.addTooltipForFistLevel(column.value)
        }));
    }

    createLevel2Header(columns: UiTableHeaderInterface[]): void {
        this.columnsLevel2 = []
            .concat(...columns.map((column) => column.children))
            .filter((column) => !column.children?.length)
            .map((column) => ({
                value: column.value,
                translate: this.alternativeColumnFieldTranslate(column.value),
                ...this.addTooltipToHeader(column.value),
                isBreakdown: column?.isBreakdown,
                // className: this.isColumnIncludesInGroup(columns, column.value),
                dataAttributes: this.dataAttributes(columns, column.value),
                ...this.addTooltipForSecondLevel(column.value)
            }));
    }

    private dataAttributes(columns: UiTableHeaderInterface[], column: string): UiTable2ColumnDataAttributesModel[] {
        const find = columns.find((el) => el.children.map((el2) => el2.value).includes(column));

        if (find.children.length > 1) {
            const findIndex = find.children.findIndex((el) => el.value === column);
            let group = 'middle';

            if (findIndex === 0) {
                group = 'first';
            }

            if (findIndex === find.children.length - 1) {
                group = 'last';
            }

            return [
                {
                    'data-statistic-group': group
                },
                {
                    'data-statistic-column': column
                }
            ];
        }

        return [];
    }

    private addTooltipToHeader(key: string): UiTable2ColumnTooltipModel {
        switch (key) {
            case 'total_conversions':
                return {
                    tooltip: true,
                    tooltipTranslate: `reports.table.tooltip.${key}`
                };
            case 'ctr':
            case 'cr':
            case 'pr':
            case 'rr':
            case 'cv_total':
            case 'tr':
            case 'rpc':
            case 'cpc':
            case 'epc':
            case 'rpa':
            case 'cpa':
            case 'epa':
            case 'rpm':
            case 'cpm':
            case 'ar':
            case 'epm':
                return {
                    tooltip: true,
                    tooltipTranslate: `reports.table.tooltip.${key}`
                };
            default:
                return null;
        }
    }

    private addTooltipForFistLevel(key: string): UiTable2ColumnTooltipModel {
        switch (key) {
            case 'clicks':
                return {
                    tooltip: true,
                    tooltipType: UiTable2ColumnTooltipTypeEnum.Info,
                    tooltipKey: 'clicks_main'
                };
            case 'approved_conversions':
            case 'pending_conversions':
            case 'rejected_conversions':
            case 'trash_conversions':
                return {
                    tooltip: true,
                    tooltipType: UiTable2ColumnTooltipTypeEnum.Info
                };
            case 'total_conversions':
                return {
                    tooltip: true,
                    tooltipTranslate: this.getTitleForTotalConversions,
                    tooltipType: UiTable2ColumnTooltipTypeEnum.Info
                };
            default:
                return null;
        }
    }

    private addTooltipForSecondLevel(key: string): UiTable2ColumnTooltipModel {
        switch (key) {
            case 'clicks':
            case 'unique_clicks':
            case 'invalid_clicks':
                return {
                    tooltip: true,
                    tooltipType: UiTable2ColumnTooltipTypeEnum.Default,
                    tooltipTranslate: `reports_page.statistics.tooltip.table.${key}`
                };
            case 'cv_total':
                return {
                    tooltip: true,
                    tooltipType: UiTable2ColumnTooltipTypeEnum.Default,
                    tooltipTranslate: `reports.table.tooltip.${this.getTitleForCvTotal}`
                };
            default:
                return null;
        }
    }

    private alternativeColumnFieldTranslateForFirstLevel(key: string): string {
        const alternative = ['approved_conversions', 'pending_conversions', 'rejected_conversions', 'trash_conversions'];

        if (alternative.includes(key)) {
            return `reports_page.statistics.table.headers.${key}`;
        }
        return `table.column.${key}`;
    }

    private alternativeColumnFieldTranslate(key: string): string {
        const alternative = [
            'cv_approved',
            'cv_pending',
            'cv_rejected',
            'cv_total',
            'clicks',
            'impressions',
            'antifraud_logic_score',
            'cv_trash'
        ];

        if (alternative.includes(key)) {
            return `reports.table.column.${key}`;
        }
        return `table.column.${key}`;
    }

    private get getTitleForTotalConversions(): string {
        return this.platformSettingsQuery.settings.include_rejected_in_totals
            ? 'reports.table.tooltip.total_conversions_include_rejected_in_totals'
            : 'reports.table.tooltip.total_conversions';
    }

    private get getTitleForCvTotal(): string {
        return this.platformSettingsQuery.settings.include_rejected_in_totals ? 'cv_total' : 'total_conversions_without_rejected';
    }
}
