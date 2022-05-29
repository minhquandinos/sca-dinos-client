import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { CREATIVE_TYPES_LIST_TRANSLATE_MAP, CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'creativeTypeTitle'
})
export class CreativeTypeTitlePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(creativeType: CreativeTypesIdEnum): Observable<string> {
        const translate = CREATIVE_TYPES_LIST_TRANSLATE_MAP[creativeType];
        if (!translate) {
            return EMPTY;
        }
        return this.translate.stream(translate);
    }
}
