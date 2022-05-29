import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PaymentFrequencyIdEnum, PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'invoiceFrequencyItemsTransform'
})
export class InvoiceFrequencyItemsTransformPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(list: PlatformListsFormatInterface[], type: PaymentFrequencyIdEnum): Observable<PlatformListsFormatInterface[]> {
        return type === PaymentFrequencyIdEnum.Weekly ? this.transformWeeklyItems(list) : of(list);
    }

    private transformWeeklyItems(list: PlatformListsFormatInterface[]): Observable<PlatformListsFormatInterface[]> {
        return this.translate.onLangChange.pipe(
            startWith(''),
            map((): any =>
                list?.map((day) => ({
                    ...day,
                    title: this.translate.instant(`interface.date.week.list.${day.title}`)
                }))
            )
        );
    }
}
