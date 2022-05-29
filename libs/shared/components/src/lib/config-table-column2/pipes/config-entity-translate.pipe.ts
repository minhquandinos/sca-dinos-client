import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UiTable2CustomColumnTranslate } from '@scaleo/ui-kit/elements';

import { ConfigTableAlternativeTranslateService } from '../services/config-table-alternative-translate.service';

@Pipe({
    name: 'configEntityTranslate'
})
export class ConfigEntityTranslatePipe implements PipeTransform {
    constructor(private alternativeTranslateService: ConfigTableAlternativeTranslateService, private translate: TranslateService) {}

    transform(key: string, type: 'key' | 'item'): Observable<string> {
        const defaultSchema = `table.column.${key}`;

        return this.alternativeTranslateService.translate$(type).pipe(
            switchMap((translateType) => {
                if (translateType) {
                    return this.alternativeTranslate(of(translateType), key, defaultSchema);
                }
                return this.translate.stream(defaultSchema);
            })
        );
    }

    private alternativeTranslate(
        stream$: Observable<UiTable2CustomColumnTranslate>,
        key: string,
        defaultSchema: string
    ): Observable<string> {
        return stream$.pipe(
            map((items) => items?.[key] || defaultSchema),
            switchMap((schema) => this.translate.stream(schema))
        );
    }
}
