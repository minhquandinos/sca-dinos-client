import { Pipe, PipeTransform } from '@angular/core';

import { ConfigFormatDateType, ConfigFormatMoneyModel, ConfigFormatNumberModel, TransformFormatEnum } from '@scaleo/platform/format/models';
import { FormatService } from '@scaleo/platform/format/service';

@Pipe({
    name: 'format',
    pure: false
})
export class FormatPipe implements PipeTransform {
    constructor(private formatService: FormatService) {}

    // TODO
    // разобраться почему при перегрузке схлопываются типы
    transform(value: any, type?: TransformFormatEnum.Date | string, config?: ConfigFormatDateType): string;
    transform(
        value: any,
        type?: TransformFormatEnum.Number | TransformFormatEnum.Percent | string,
        config?: ConfigFormatNumberModel
    ): string;
    transform(
        value: any,
        type?: TransformFormatEnum.Money | TransformFormatEnum.Coasting | string,
        config?: ConfigFormatMoneyModel
    ): string;
    transform(value: any, type: TransformFormatEnum.IdName | string, config?: number): string;
    transform(value: any, type?: any, config?: any): string {
        return value || value === 0 ? this.formatService.format(value, type, config) : value;
    }
}

// export class FormatPipe extends BaseFormatPipe implements PipeTransform, OnDestroy {
//     constructor(
//         private readonly formatService: FormatService,
//         private readonly platformListQuery: PlatformListQuery,
//         private readonly cdr: ChangeDetectorRef
//     ) {
//         super();
//     }
//
//     updateValue(value: string, type?: any, config?: any): void {
//         this.value = this.formatService.format(value, type, config);
//         this.cdr.markForCheck();
//     }
//
//     // TODO
//     // разобраться почему при перегрузке схлопываются типы
//     transform(value: any, type?: TransformFormatEnum.Date | string, config?: ConfigFormatDateType): string;
//     transform(
//         value: any,
//         type?: TransformFormatEnum.Number | TransformFormatEnum.Percent | string,
//         config?: ConfigFormatNumberModel
//     ): string;
//     transform(
//         value: any,
//         type?: TransformFormatEnum.Money | TransformFormatEnum.Coasting | string,
//         config?: ConfigFormatMoneyModel
//     ): string;
//     transform(value: any, type: TransformFormatEnum.IdName | string, config?: number): string;
//     transform(value: any, type?: any, config?: any): string {
//         const canTransform = value || value === 0;
//
//         if (!canTransform) {
//             return value;
//         }
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
//                         this.updateValue(value, type, config);
//                     });
//             } else {
//                 this.updateValue(value, type, config);
//             }
//         } else {
//             this.updateValue(value, type, config);
//         }
//
//         return this.value;
//     }
//
//     ngOnDestroy(): void {
//         super.ngOnDestroy();
//     }
// }
