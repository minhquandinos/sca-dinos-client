import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { filter, Observable, of, startWith, switchMap, tap, zip } from 'rxjs';

@Injectable()
export class TranslateHttpLoaderService {
    constructor(private readonly translate: TranslateService) {}

    loader(loader: MultiTranslateHttpLoader): Observable<any> {
        return this.translate.onLangChange.pipe(
            startWith({
                lang: this.translate.currentLang
            } as LangChangeEvent),
            filter((currentLang: LangChangeEvent) => !!currentLang.lang),
            switchMap((currentLang: LangChangeEvent) => {
                return zip([of(currentLang), loader.getTranslation(currentLang.lang)]);
            }),
            tap(([currentLang, translations]) => {
                this.translate.setTranslation(currentLang.lang, translations, true);
            })
        );
    }
}
