import { Pipe, PipeTransform } from '@angular/core';

import { ConfigFormatInterface } from '@scaleo/platform/format/models';
import { FormatService } from '@scaleo/platform/format/service';

@Pipe({
    name: 'formatByKey'
})
export class FormatByKeyPipe implements PipeTransform {
    constructor(private formatService: FormatService) {}

    transform(value: any, key: string, config?: ConfigFormatInterface): string {
        return this.formatService.formatByKey(value, key, config);
    }
}

// export class FormatByKeyPipe extends BaseFormatPipe implements PipeTransform, OnDestroy {
//     constructor(
//         private readonly formatService: FormatService,
//         private readonly platformListQuery: PlatformListQuery,
//         private readonly cdr: ChangeDetectorRef
//     ) {
//         super();
//     }
//
//     updateValue(value: string, key?: any, config?: any): void {
//         this.value = this.formatService.formatByKey(value, key, config);
//         this.cdr.markForCheck();
//     }
//
//     transform(value: any, key: string, config?: ConfigFormatInterface): string {
//         const type = FormatService.getFormatForKey(key);
//
//         const isCurrenciesFormat = this.isCurrenciesFormat(type);
//
//         if (isCurrenciesFormat) {
//             const hasLoadCurrencies = !!this.platformListQuery.item('currencies').length;
//
//             if (!hasLoadCurrencies) {
//                 this.onCurrenciesLoaded = this.platformListQuery
//                     .item$('currencies')
//                     .pipe(filter((currencies) => !!currencies?.length))
//                     .subscribe(() => {
//                         this.updateValue(value, key, config);
//                     });
//             } else {
//                 this.updateValue(value, key, config);
//             }
//         } else {
//             this.updateValue(value, key, config);
//         }
//
//         return this.value;
//     }
//
//     ngOnDestroy() {
//         super.ngOnDestroy();
//     }
// }
