import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ExtendedTargetingConditionType } from '../../../../../../../../../offer/common/src/lib/offer/offer-targeting.model';

@Pipe({
    name: 'offerTargetingConditionTitle'
})
export class OfferTargetingConditionTitlePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(condition: ExtendedTargetingConditionType): Observable<string> {
        if (condition?.title_en || condition?.title_ru) {
            const { title_en, title_ru } = condition;
            const lang = (currentLang: string): string => (currentLang === 'ru' ? title_ru : title_en);
            return this.translate.onLangChange.pipe(
                startWith({ lang: this.translate.currentLang }),
                map((currentLang) => lang(currentLang.lang))
            );
        }

        return of(condition.title);
    }
}
