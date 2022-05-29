import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomDateRangeTitleEnum, CustomDateRangeTranslateEnum, RangeMapModel } from '@scaleo/platform/date/model';
import { CustomDateRangeUtil } from '@scaleo/platform/date/util';

@Injectable()
export class CustomDateRangePresetService {
    private _preset$: BehaviorSubject<CustomDateRangeTitleEnum> = new BehaviorSubject<CustomDateRangeTitleEnum>(
        CustomDateRangeTitleEnum.Last14Days
    );

    readonly preset$ = this._preset$.asObservable();

    constructor(private translate: TranslateService) {}

    get preset(): CustomDateRangeTitleEnum {
        return this._preset$.value;
    }

    get presetTitle(): CustomDateRangeTitleEnum {
        return this.labelRangeMap[this._preset$.value];
    }

    updatePreset(value: CustomDateRangeTitleEnum): void {
        this._preset$.next(value);
    }

    setPreset(startDate: Moment, endDate: Moment): void {
        if (startDate || endDate) {
            const preset = CustomDateRangeUtil.dateIsPreset(startDate, endDate);

            if (preset) {
                this.updatePreset(preset);
            } else {
                this.updatePreset(undefined);
            }
        } else if (!startDate || !endDate) {
            this.updatePreset(undefined);
        }
    }

    updatedPreset$(picker: any): Observable<CustomDateRangeTitleEnum> {
        return this.preset$.pipe(
            tap((preset) => {
                const date = CustomDateRangeUtil.getPresetDate(preset);

                if (date?.rangeTo || date?.rangeFrom) {
                    if (preset === CustomDateRangeTitleEnum.Today || preset === CustomDateRangeTitleEnum.Yesterday) {
                        picker.datePicker.setStartDate(date.rangeFrom);
                        picker.datePicker.setEndDate(date.rangeFrom);
                    } else {
                        picker.datePicker.setStartDate(date.rangeFrom);
                        picker.datePicker.setEndDate(date.rangeTo);
                    }
                }
            })
        );
    }

    get presetRangeMap(): RangeMapModel {
        return {
            [this.translate.instant(CustomDateRangeTranslateEnum.Today)]: CustomDateRangeTitleEnum.Today,
            [this.translate.instant(CustomDateRangeTranslateEnum.Yesterday)]: CustomDateRangeTitleEnum.Yesterday,
            [this.translate.instant(CustomDateRangeTranslateEnum.Last7Days)]: CustomDateRangeTitleEnum.Last7Days,
            [this.translate.instant(CustomDateRangeTranslateEnum.Last14Days)]: CustomDateRangeTitleEnum.Last14Days,
            [this.translate.instant(CustomDateRangeTranslateEnum.Last30Days)]: CustomDateRangeTitleEnum.Last30Days,
            [this.translate.instant(CustomDateRangeTranslateEnum.Last90Days)]: CustomDateRangeTitleEnum.Last90Days,
            [this.translate.instant(CustomDateRangeTranslateEnum.ThisMonth)]: CustomDateRangeTitleEnum.ThisMonth,
            [this.translate.instant(CustomDateRangeTranslateEnum.LastMonth)]: CustomDateRangeTitleEnum.LastMonth,
            [this.translate.instant(CustomDateRangeTranslateEnum.ThisYear)]: CustomDateRangeTitleEnum.ThisYear
        };
    }

    get labelRangeMap(): RangeMapModel {
        return {
            [CustomDateRangeTitleEnum.Today]: this.translate.instant(CustomDateRangeTranslateEnum.Today),
            [CustomDateRangeTitleEnum.Yesterday]: this.translate.instant(CustomDateRangeTranslateEnum.Yesterday),
            [CustomDateRangeTitleEnum.Last7Days]: this.translate.instant(CustomDateRangeTranslateEnum.Last7Days),
            [CustomDateRangeTitleEnum.Last14Days]: this.translate.instant(CustomDateRangeTranslateEnum.Last14Days),
            [CustomDateRangeTitleEnum.Last30Days]: this.translate.instant(CustomDateRangeTranslateEnum.Last30Days),
            [CustomDateRangeTitleEnum.Last90Days]: this.translate.instant(CustomDateRangeTranslateEnum.Last90Days),
            [CustomDateRangeTitleEnum.ThisMonth]: this.translate.instant(CustomDateRangeTranslateEnum.ThisMonth),
            [CustomDateRangeTitleEnum.LastMonth]: this.translate.instant(CustomDateRangeTranslateEnum.LastMonth),
            [CustomDateRangeTitleEnum.ThisYear]: this.translate.instant(CustomDateRangeTranslateEnum.ThisYear)
        };
    }
}
