import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({
    name: 'extendedTargetingProfileTranslate'
})
export class ExtendedTargetingPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(targeting: any, key = 'title'): Observable<any> {
        return this.translate.onLangChange.pipe(
            startWith(this.translate.currentLang),
            map((language: any) => {
                let lang = language;
                if (language.lang) {
                    lang = language.lang;
                }
                if (targeting[`${key}_${lang}`] && [`${key}_${lang}`]) {
                    return targeting[`${key}_${lang}`];
                }
                return targeting[key];
            })
        );
    }
}
