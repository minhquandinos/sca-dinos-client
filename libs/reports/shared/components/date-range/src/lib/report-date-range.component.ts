import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { CustomDateRangeUtil, DateUtil } from '@scaleo/platform/date/util';
import { ReportsService } from '@scaleo/reports/state';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { CustomDateRangeComponent, CustomDateRangePresetService } from '@scaleo/shared/components';

@Component({
    selector: 'app-report-date-range',
    template: `
        <app-custom-date-range
            position="right"
            [showTimeZone]="showTimeZone"
            [showHintTimeZone]="showHintTimeZone"
            (toggle)="dateWasChanged($event)"
            [startDate]="(date$ | async)?.rangeFrom"
            [endDate]="(date$ | async)?.rangeTo"
        ></app-custom-date-range>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [CustomDateRangePresetService, UnsubscribeService]
})
export class ReportDateRangeComponent implements OnInit {
    @Input() showTimeZone: boolean;

    @Input() showHintTimeZone: boolean;

    @ViewChild(CustomDateRangeComponent, { static: true })
    customDateRangeComponent: CustomDateRangeComponent;

    date$ = this.reportsService.date$;

    readonly reportDate = ['transactions', 'reports', 'leads'];

    private previousPageDate$: BehaviorSubject<CustomDateRangeModel> = new BehaviorSubject<CustomDateRangeModel>(null);

    constructor(
        private reportsService: ReportsService,
        private customDateRangeService: CustomDateRangeService,
        private readonly customDateRangePresetService: CustomDateRangePresetService,
        private route: ActivatedRoute,
        private router: Router,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.init();
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                takeUntil(this.unsubscribe)
            )
            .subscribe((event: any) => {
                const check = this.reportDate.some((parentUrl) => {
                    const match = new RegExp(parentUrl, 'g');
                    return match.test((event as NavigationStart).url);
                });

                if (!check) {
                    this.reportsService.reset();
                }
            });
    }

    dateWasChanged(date: CustomDateRangeModel): void {
        this.reportsService.updateDate(date);
    }

    get date() {
        return this.reportsService.date;
    }

    updateDateAndPreset(date: CustomDateRangeModel, preset: CustomDateRangeTitleEnum): void {
        this.dateWasChanged(date);

        if (preset !== CustomDateRangeTitleEnum.Custom) {
            this.customDateRangeComponent.switchPreset(preset);
        } else {
            this.customDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.Custom);
            this.customDateRangeComponent.pickerService.datePicker.setStartDate(DateUtil.moment(date.rangeFrom));
            this.customDateRangeComponent.pickerService.datePicker.setEndDate(DateUtil.moment(date.rangeTo));
        }
    }

    switchPreset(preset: CustomDateRangeTitleEnum = this.customDateRangeService.baseSelectedRange): void {
        this.customDateRangeComponent.switchPreset(preset);
        const date = this.customDateRangeService.rangeDate(preset);

        if (date) {
            if (preset === CustomDateRangeTitleEnum.Today || preset === CustomDateRangeTitleEnum.Yesterday) {
                this.updateDateAndPreset(
                    {
                        rangeFrom: date.rangeTo,
                        rangeTo: date.rangeTo
                    },
                    preset
                );
            } else {
                this.updateDateAndPreset(
                    {
                        rangeFrom: date.rangeFrom,
                        rangeTo: date.rangeTo
                    },
                    preset
                );
            }
        }
    }

    switchSingle(single: boolean): void {
        this.customDateRangeComponent.switchSingle(single);
    }

    private init(): void {
        if (!this.reportsService.hasDate) {
            this.dateWasChanged({
                rangeFrom: this.customDateRangeService.rangeFrom,
                rangeTo: this.customDateRangeService.rangeTo,
                selectedRange: this.customDateRangeService.baseSelectedRange
            });
        }
    }

    setPreviousPageDate(currentPath: BreakdownEnum): void {
        if (currentPath === BreakdownEnum.Month && !this.reportsService.manualReset) {
            const selectedRange = this.previousPageDate$?.value?.selectedRange || this.customDateRangeService.baseSelectedRange;

            this.updateDateAndPreset(
                this.previousPageDate$?.value || {
                    rangeFrom: this.customDateRangeService.rangeFrom,
                    rangeTo: this.customDateRangeService.rangeTo,
                    selectedRange
                },
                selectedRange
            );
        } else {
            this.previousPageDate$.next(this.date);
        }
    }

    get isCustomDate(): boolean {
        const preset = CustomDateRangeUtil.dateIsPreset(
            DateUtil.date(this.reportsService?.date?.rangeFrom),
            DateUtil.date(this.reportsService?.date?.rangeTo)
        );
        return !preset || ![CustomDateRangeTitleEnum.Today, CustomDateRangeTitleEnum.Yesterday].includes(preset);
    }
}
