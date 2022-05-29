import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { PLATFORM_LIST_TRANSLATE_MAP, ScaleoPlatformListType } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'platformListTranslate'
})
export class PlatformListTranslatePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: string | number, listType: keyof ScaleoPlatformListType): Observable<string> {
        const list = PLATFORM_LIST_TRANSLATE_MAP?.[listType];
        return list?.[value] ? this.translate.stream(list?.[value]) : EMPTY;
    }
}
