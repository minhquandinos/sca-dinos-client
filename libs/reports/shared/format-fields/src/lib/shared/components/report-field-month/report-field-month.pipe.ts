import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'reportFieldMonth'
})
export class ReportFieldMonthPipe implements PipeTransform {
    transform(month: number, year: number, lang: string): string {
        if (month) {
            moment.locale(lang);
            const date = `${year}-${+month > 9 ? month : `0${month}`}-01`;
            return moment(date).format('MMMM YYYY');
        }
        return month.toString();
    }
}
