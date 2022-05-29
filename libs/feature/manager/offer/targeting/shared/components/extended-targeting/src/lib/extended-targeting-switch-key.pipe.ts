import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { OfferTargetingRulesEnum } from '../../../../../data-access/src/lib/enums/offer-targeting-rules.enum';

@Pipe({
    name: 'extendedTargetingTranslate'
})
export class ExtendedTargetingSwitchKeyPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(targeting: number, key = 'title'): Observable<any> {
        return this.translate.onLangChange.pipe(
            startWith(this.translate.currentLang),
            map((language: any) => {
                let lang = language;
                if (language.lang) {
                    lang = language.lang;
                }
                switch (targeting) {
                    case OfferTargetingRulesEnum.ConnectionType:
                    case OfferTargetingRulesEnum.DeviceType:
                        return `${key}_${lang}`;
                    default:
                        return key;
                }
            })
        );
    }
}
