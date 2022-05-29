import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment/moment';

import { CustomDateRangeTitleEnum, DateStringModel } from '@scaleo/platform/date/model';
import { CustomDateRangeUtil } from '@scaleo/platform/date/util';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({ providedIn: 'root' })
export class CustomDateRangeService {
    readonly serverFormat = 'YYYY-MM-DD';

    private _baseDiffDays = 14;

    private _baseRangeFrom = moment(new Date()).subtract(13, 'd');

    private _baseRangeTo = moment(new Date()).endOf('day');

    private _basePreviousRangeFrom = moment(this.baseRangeFrom).subtract(this._baseDiffDays, 'd');

    private _basePreviousRangeTo = moment(this.baseRangeTo).subtract(this._baseDiffDays, 'd');

    private _baseSelectedRange = CustomDateRangeTitleEnum.Last14Days;

    constructor(private settingsQuery: PlatformSettingsQuery) {
        this.setDefaultRange();
    }

    get baseDiffDays(): number {
        return this._baseDiffDays;
    }

    get rangeFrom(): string {
        return this.baseRangeFrom.format(this.serverFormat);
    }

    get rangeTo(): string {
        return this.baseRangeTo.format(this.serverFormat);
    }

    get previousRangeFrom(): string {
        return this.basePreviousRangeFrom.format(this.serverFormat);
    }

    get previousRangeTo(): string {
        return this.basePreviousRangeTo.format(this.serverFormat);
    }

    get baseRangeFrom(): Moment {
        return this._baseRangeFrom;
    }

    get baseRangeTo(): Moment {
        return this._baseRangeTo;
    }

    get basePreviousRangeFrom(): Moment {
        return this._basePreviousRangeFrom;
    }

    get basePreviousRangeTo(): Moment {
        return this._basePreviousRangeTo;
    }

    get baseSelectedRange(): CustomDateRangeTitleEnum {
        return this._baseSelectedRange;
    }

    rangeDate(range: CustomDateRangeTitleEnum): DateStringModel {
        return CustomDateRangeUtil.getPresetDateString(range, this.serverFormat);
    }

    private setDefaultRange(): void {
        switch (this.settingsQuery.settings.platform_default_daterange) {
            case CustomDateRangeTitleEnum.Today:
                this.setBaseDateRange(CustomDateRangeTitleEnum.Today);
                break;
            case CustomDateRangeTitleEnum.Yesterday:
                this.setBaseDateRange(CustomDateRangeTitleEnum.Yesterday);
                break;
            case CustomDateRangeTitleEnum.Last7Days:
                this.setBaseDateRange(CustomDateRangeTitleEnum.Last7Days);
                break;
            case CustomDateRangeTitleEnum.ThisMonth:
                this.setBaseDateRange(CustomDateRangeTitleEnum.ThisMonth);
                break;
            case CustomDateRangeTitleEnum.Last30Days:
                this.setBaseDateRange(CustomDateRangeTitleEnum.Last30Days);
                break;
            case CustomDateRangeTitleEnum.LastMonth:
                this.setBaseDateRange(CustomDateRangeTitleEnum.LastMonth);
                break;
            case CustomDateRangeTitleEnum.Last90Days:
                this.setBaseDateRange(CustomDateRangeTitleEnum.Last90Days);
                break;
            case CustomDateRangeTitleEnum.ThisYear:
                this.setBaseDateRange(CustomDateRangeTitleEnum.ThisYear);
                break;
            default:
                break;
        }
    }

    private setBaseDateRange(preset: CustomDateRangeTitleEnum): void {
        const [rangeFrom, rangeTo] = CustomDateRangeUtil.dateRangeMap(preset);

        this._baseDiffDays = CustomDateRangeUtil.countDiffDate({ rangeFrom, rangeTo });

        this._baseRangeFrom = rangeFrom;

        this._baseRangeTo = rangeTo;

        this._baseSelectedRange = preset;
    }
}
