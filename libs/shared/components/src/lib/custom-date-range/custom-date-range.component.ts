import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DaterangepickerComponent, DaterangepickerConfig } from 'ng2-daterangepicker';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { CustomDateRangeUtil } from '@scaleo/platform/date/util';
import { DateWatcherService } from '@scaleo/platform/date/watcher';
import { DateFormatService } from '@scaleo/platform/format/service';

import { DefaultTimezoneComponent } from './default-timezone/default-timezone.component';
import { DefaultTimezoneService } from './default-timezone/default-timezone.service';
import { NewTimezoneService } from './default-timezone/new-timezone.service';
import { CustomDateRangeInitOptionsModel, CustomDateRangeInitService } from './services/custom-date-range-init.service';
import { CustomDateRangePickerService } from './services/custom-date-range-picker.service';
import { CustomDateRangePresetService } from './services/custom-date-range-preset.service';

@Component({
    selector: 'app-custom-date-range',
    templateUrl: './custom-date-range.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        CustomDateRangePresetService,
        CustomDateRangePickerService,
        CustomDateRangeInitService,
        UnsubscribeService,
        NewTimezoneService
    ]
})
export class CustomDateRangeComponent implements OnInit, OnDestroy {
    @Input() position: 'left' | 'right' | 'center' = 'left';

    @Input() drops: 'up' | 'down' = 'down';

    @Input() single: boolean;

    @Input() type: 'block' | 'input' = 'block';

    @Input() label: string;

    @Input() startDate: string = null;

    @Input() endDate: string = null;

    @Input() emptyDate: boolean;

    @Input() autoUpdateInput = true;

    @Input() showTimeZone = false;

    @Input() disabled = false;

    @Input() showHintTimeZone = false;

    @Input() haveNotEndDate = false;

    @Input() availableFeaturesDate = false;

    @Input() placeholder: string;

    @Output() toggle: EventEmitter<CustomDateRangeModel> = new EventEmitter<CustomDateRangeModel>();

    options$ = this.initService.options$;

    inputValue: any;

    timeZoneHint: string;

    @ViewChild('datepickerRef', { static: true }) datepickerRef: ElementRef;

    @ViewChild('dateRange', { static: true }) dateRange: ElementRef;

    @ViewChild('timezone', { static: true }) timezone: ElementRef;

    @ViewChild('hiddenValueRef', { static: true }) hiddenValueRef: ElementRef;

    @ViewChild(DaterangepickerComponent) set _picker(picker: DaterangepickerComponent) {
        if (picker) {
            this.pickerService.picker = picker;
            this.pickerService.picker$ = picker;
        }
    }

    daterangeUpdate: Subject<any> = new Subject<any>();

    constructor(
        private daterangepickerOptions: DaterangepickerConfig,
        private translate: TranslateService,
        private renderer2: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private app: ApplicationRef,
        private timeZoneService: DefaultTimezoneService,
        private defaultTimezoneService: DefaultTimezoneService,
        private newTimezoneService: NewTimezoneService,
        @Inject(DOCUMENT) private document: Document,
        private cdr: ChangeDetectorRef,
        private customDateRangeService: CustomDateRangeService,
        public profileQuery: ProfileQuery,
        private presetService: CustomDateRangePresetService,
        private unsubscribe: UnsubscribeService,
        private dateWatcherService: DateWatcherService,
        private dateFormatService: DateFormatService,
        public readonly pickerService: CustomDateRangePickerService,
        private readonly initService: CustomDateRangeInitService
    ) {
        this.reInitComponent();
    }

    ngOnInit(): void {
        this.showTimeZone = false;
        this.initOptions();
        this.initPickerPreset();
        this.updatedPicker();
        this.translateDateRange();

        if (this.disabled) {
            this.renderer2.addClass(this.dateRange.nativeElement, 'disabled');
        }

        if (this.showHintTimeZone) {
            const userTimeZone = this.profileQuery.profile.timezone;
            this.timeZoneService.timezones$.pipe(takeUntil(this.unsubscribe)).subscribe((tz) => {
                this.timeZoneHint = tz.find((item) => item.timezone === userTimeZone)?.title;
            });
            this.defaultTimezoneService.initTimezones();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    switchSingle(single: boolean): void {
        if (single) {
            this.single = true;
            this.pickerService.datePicker.singleDatePicker = true;
            this.pickerService.datePicker.autoApply = true;
        } else {
            this.single = false;
            this.pickerService.datePicker.singleDatePicker = null;
            this.pickerService.datePicker.autoApply = false;
        }

        let startDate = this.startDate ? this.startDate : this.customDateRangeService.baseRangeFrom;
        const endDate = this.endDate ? this.endDate : this.customDateRangeService.baseRangeTo;

        if (this.single) {
            startDate = endDate;
        }
        this.pickerService.datePicker.setStartDate(moment(startDate));
        this.pickerService.datePicker.setEndDate(moment(endDate));
    }

    switchPreset(preset: CustomDateRangeTitleEnum = CustomDateRangeTitleEnum.Last14Days): void {
        this.presetService.updatePreset(preset);
    }

    appliedDate(event: any): void {
        if (!this.autoUpdateInput) {
            this.pickerService.picker.options.autoUpdateInput = true;
        }

        this.updateDateRange(event);
    }

    showPicker(event: any): void {
        const pageInner = this.document.querySelector('.page-content');
        pageInner.addEventListener(
            'scroll',
            () => {
                event.picker.hide();
            },
            { once: true }
        );
        this.renderer2.addClass(this.dateRange.nativeElement, 'shadow-datarange');
        event.picker.container[0].classList.add('open-custom-daterangepicker');
        event.picker.container[0].classList.add('show-calendar');
        if (this.single) {
            event.picker.container[0].classList.add('custom-single-daterangepicker');
        } else {
            event.picker.container[0].classList.remove('custom-single-daterangepicker');
        }
        if (this.showTimeZone) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(DefaultTimezoneComponent);
            const ref = factory.create(this.injector, [], this.timezone.nativeElement);
            this.app.attachView(ref.hostView);
            this.renderer2.appendChild(event.picker.container[0], this.timezone.nativeElement);
        }
        event.picker.container[0].classList.add('have-timezone');
        event.picker.container[0].classList.remove('dropdown-menu');
    }

    hidePicker(event: any): void {
        Promise.resolve().then(() => {
            event.picker.container[0].classList.remove('open-custom-daterangepicker');
            this.renderer2.removeClass(this.dateRange.nativeElement, 'shadow-datarange');
            if (this.single) {
                event.picker.container[0].classList.add('custom-single-daterangepicker');
            }

            if (
                this.presetService.preset === CustomDateRangeTitleEnum.Today ||
                this.presetService.preset === CustomDateRangeTitleEnum.Yesterday
            ) {
                event.picker.container[0].classList.remove('custom-single-daterangepicker');
            }

            // console.log('hide', this.presetService.presetTitle);
            if (this.presetService.presetTitle) {
                event.picker.element[0].value = this.presetService.presetTitle;
            }
        });
    }

    get rangeFrom(): string {
        return this.pickerService.datePicker?.startDate?.format(this.customDateRangeService.serverFormat);
    }

    get rangeTo(): string {
        return this.pickerService.datePicker?.endDate?.format(this.customDateRangeService.serverFormat);
    }

    private initOptions(): void {
        const config: CustomDateRangeInitOptionsModel = {
            autoUpdateInput: this.autoUpdateInput,
            availableFeaturesDate: this.availableFeaturesDate,
            drops: this.drops,
            endDate: this.endDate,
            startDate: this.startDate,
            position: this.position,
            single: this.single
        };
        this.initService.config(config).init();
    }

    private resizeWidth(label: string): void {
        if (label) {
            const hideDiv = (this.document.querySelector('#hiddenBlock') as HTMLElement) || this.hiddenValueRef.nativeElement;
            hideDiv.textContent = label;
            const inputWidth = hideDiv.offsetWidth;
            this.setMaxWidthForDatePicker(inputWidth);
            if (inputWidth === 0) {
                setTimeout((): any => this.setMaxWidthForDatePicker(hideDiv.offsetWidth), 100);
            } else {
                this.setMaxWidthForDatePicker(inputWidth);
            }
        } else {
            this.renderer2.removeStyle(this.datepickerRef.nativeElement, 'max-width');
            this.renderer2.setStyle(this.datepickerRef.nativeElement, 'min-width', '165px');
        }
    }

    private setMaxWidthForDatePicker(inputWidth: number): void {
        this.renderer2.setStyle(this.datepickerRef.nativeElement, 'max-width', `${inputWidth + 12}px`);
        this.renderer2.removeStyle(this.datepickerRef.nativeElement, 'min-width');
    }

    private setDataPickerLabel2(picker: any): void {
        const newPreset = this.presetService.presetTitle || undefined;

        if (newPreset) {
            picker.element[0].value = newPreset;
        }

        if (this.single && this.startDate === '') {
            picker.element[0].value = '';
        }

        if (this.type === 'block') {
            this.resizeWidth(newPreset);
        }
    }

    private initPickerPreset(): void {
        this.pickerService.picker$
            .pipe(
                filter((picker) => !!picker.datePicker),
                takeUntil(this.unsubscribe)
            )
            .subscribe(({ datePicker: { startDate, endDate } }) => {
                this.inputValue = this.datepickerRef.nativeElement.value;
                this.cdr.detectChanges();
                this.presetService.setPreset(startDate, endDate);
            });
    }

    private updatedPicker(): void {
        this.pickerService.picker$
            .pipe(
                filter((picker) => !!picker),
                switchMap((picker) => this.presetService.updatedPreset$(picker)),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.setDataPickerLabel2(this.pickerService.datePicker);
            });
    }

    private selectedRange(): CustomDateRangeTitleEnum {
        let selectedRange;
        if (this.single) {
            if (this.pickerService.datePicker.startDate.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
                selectedRange = CustomDateRangeTitleEnum.Today;
            } else if (this.pickerService.datePicker.startDate.format('YYYY-MM-DD') === moment().subtract(1, 'day').format('YYYY-MM-DD')) {
                selectedRange = CustomDateRangeTitleEnum.Yesterday;
            } else {
                selectedRange = null;
            }
        } else {
            selectedRange = this.presetService.presetRangeMap[this.pickerService.datePicker.chosenLabel];
        }

        this.presetService.updatePreset(selectedRange);
        this.setDataPickerLabel2(this.pickerService.datePicker);

        return selectedRange || CustomDateRangeTitleEnum.Custom;
    }

    private updateDateRange(event: any): void {
        const format = 'YYYY-MM-DD';

        const newDate: CustomDateRangeModel = {
            rangeFrom: event.picker.startDate.format(format),
            rangeTo: event.picker.endDate.format(format),
            timezone: this.defaultTimezoneService.timezone,
            diffDays: this.customDateRangeService.baseDiffDays
        };

        if (this.showTimeZone) {
            newDate.timezone = this.newTimezoneService.timezone.value
                ? this.newTimezoneService.timezone.value
                : this.defaultTimezoneService.timezone;
        }

        newDate.selectedRange = this.selectedRange();

        newDate.diffDays = this.single
            ? 1
            : CustomDateRangeUtil.countDiffDate({
                  rangeFrom: event.picker.startDate,
                  rangeTo: event.picker.endDate
              });

        newDate.previousRangeFrom = this.single
            ? event.picker.startDate
            : CustomDateRangeUtil.previousDateFromCurrentDate(event.picker.startDate, newDate.diffDays, format, {
                  preset: newDate.selectedRange,
                  start: true
              });

        newDate.previousRangeTo = this.single
            ? event.picker.startDate
            : CustomDateRangeUtil.previousDateFromCurrentDate(event.picker.endDate, newDate.diffDays, format, {
                  preset: newDate.selectedRange
              });

        this.toggle.emit(newDate);
    }

    private translateDateRange(): void {
        this.initService.translateDateRange$
            .pipe(
                tap(() => {
                    this.setDataPickerLabel2(this.pickerService.datePicker);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private reInitComponent(): void {
        this.dateWatcherService.dateUpdated$
            .pipe(
                distinctUntilChanged(),
                tap(() => {
                    this.ngOnInit();
                    this.cdr.detectChanges();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
