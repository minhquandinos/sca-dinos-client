import { Injectable } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ConfigFormatDateType, DateFormatEnum } from '@scaleo/platform/format/models';

import { BaseFormat } from '../formats/base-format';
import { DateFormat } from '../formats/date-format';

@Injectable({
    providedIn: 'root'
})
export class DateFormatService extends BaseFormat<string> {
    constructor(private profileQuery: ProfileQuery) {
        super();
    }

    format(date: string | number, config?: ConfigFormatDateType): string {
        const validDate = new Date(date).getTime();
        if (!validDate) {
            return undefined;
        }

        const dateFormat = new DateFormat(date, config, this.shortDateFormat);
        return dateFormat.format();
    }

    get shortDateFormat(): string {
        return this.dateFormat.split(' ').shift();
    }

    private get dateFormatId(): DateFormatEnum {
        return this.profileQuery.profile ? this.profileQuery.profile.date_format_id : DateFormatEnum.DOT;
    }

    private get dateFormat(): string {
        const format = {
            [DateFormatEnum.LINE]: 'MM/DD/YYYY hh:mm:ss A',
            [DateFormatEnum.DASH]: 'YYYY-MM-DD HH:mm:ss',
            [DateFormatEnum.DOT]: 'DD.MM.YYYY HH:mm:ss'
        };
        return format[this.dateFormatId];
    }
}
