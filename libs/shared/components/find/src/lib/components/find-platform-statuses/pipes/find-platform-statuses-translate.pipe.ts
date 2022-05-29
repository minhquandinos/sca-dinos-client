import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PLATFORM_STATUSES_LIST_MAP, PlatformListsFormatInterface, ScaleoStatusesType } from '@scaleo/platform/list/access-data';
import { CustomTranslatePipe } from '@scaleo/shared/pipes';

@Pipe({
    name: 'findPlatformStatusesTranslate'
})
export class FindPlatformStatusesTranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService, private customTranslate: CustomTranslatePipe) {}

    transform(values: PlatformListsFormatInterface[], statusList: ScaleoStatusesType, customTranslateKey?: string): Observable<unknown[]> {
        if (customTranslateKey) {
            return this.customTranslate.transform(values, customTranslateKey);
        }

        // TODO NX fixed any
        const translateMap = (PLATFORM_STATUSES_LIST_MAP as any)?.[statusList];
        if (!translateMap) {
            console.error(`Add translate map for ${statusList}`);
            return of(values);
        }
        const translateTitles: string[] = values
            ?.map((value) => {
                const valueId = value.id || value.key;
                if (!translateMap?.[valueId]) {
                    if (this.translate.get(value.title)) {
                        return value.title;
                    }
                }

                return translateMap[valueId];
            })
            .filter((value) => !!value);

        if (translateTitles?.length === 0 || !translateTitles) {
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
