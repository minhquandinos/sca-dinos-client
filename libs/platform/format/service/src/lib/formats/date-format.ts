import { DateUtil } from '@scaleo/platform/date/util';
import { ConfigFormatDateType } from '@scaleo/platform/format/models';

import { BaseFormat } from './base-format';

export class DateFormat extends BaseFormat<string | number> {
    private _outputDate: string;

    constructor(
        private readonly value: string | number,
        private readonly config: ConfigFormatDateType,
        private readonly dateFormat: string
    ) {
        super();
    }

    format(): string {
        if (DateUtil.isDateUnixTime(this.value)) {
            return this.originalDate().unixTimeToDate().outputFormat();
        }

        return this.originalDate().outputFormat();
    }

    private unixTimeToDate(): this {
        this._outputDate = DateUtil.unix(this.value as number, 'YYYY-MM-DD HH:mm:ss');
        return this;
    }

    private originalDate(): this {
        this._outputDate = this.value as any;
        return this;
    }

    private outputFormat(): string {
        let format = this.dateFormat;
        if (this.config) {
            const formatMap: { [key in ConfigFormatDateType]: string } = {
                onlyTime: 'HH:mm',
                onlyFullTime: 'HH:mm:ss',
                onlyDate: this.dateFormat,
                onlyDateWithTime: `${this.dateFormat} HH:mm`,
                fullDate: `${this.dateFormat} HH:mm:ss`
            };
            format = formatMap[this.config];
        }
        return DateUtil.makeDate(this._outputDate, format);
    }
}
