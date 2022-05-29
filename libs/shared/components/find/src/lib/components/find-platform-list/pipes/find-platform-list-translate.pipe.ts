import { isDevMode, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PLATFORM_LIST_TRANSLATE_MAP, PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';

import { FindPlatformListModel } from '../models/find-platform-list.model';

@Pipe({
    name: 'findPlatformListTranslate'
})
export class FindPlatformListTranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(
        values: PlatformListsFormatInterface[],
        listType: keyof FindPlatformListModel,
        itemIncrement: number | string,
        disableTranslate?: boolean
    ): Observable<unknown[]> {
        if (disableTranslate || !values) {
            return of(values);
        }

        const translateMap = PLATFORM_LIST_TRANSLATE_MAP?.[listType];

        // if (!translateMap) {
        //     if (isDevMode()) {
        //         console.error(`Add translate map for ${listType}`);
        //     }
        //     return of(values);
        // }
        const translateTitles: string[] = values
            .map((value) => {
                if (!translateMap?.[(value as any)[itemIncrement]]) {
                    if (this.translate.get(value.title)) {
                        return value.title;
                    }
                }
                return translateMap[(value as any)[itemIncrement]];
            })
            .filter((value) => !!value);

        if (translateTitles.length === 0) {
            return EMPTY;
        }

        return this.translate?.stream(translateTitles).pipe(
            map((translated) =>
                values.map((value, index) => ({
                    ...value,
                    title: Object.values(translated)[index]
                }))
            )
        );
    }
}
