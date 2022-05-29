import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { TranslateHttpLoaderService } from '@scaleo/core/services/translate';
import { LanguageEnum, LANGUAGES_TOKEN } from '@scaleo/platform/language/init';

const httpLoaderFactory = (http: HttpClient): MultiTranslateHttpLoader =>
    new MultiTranslateHttpLoader(http, [{ prefix: 'assets/i18n/feature/advertiser/', suffix: `.json` }]);

@NgModule({
    imports: [CommonModule],
    providers: [
        TranslateHttpLoaderService,
        {
            provide: LANGUAGES_TOKEN,
            useValue: [
                {
                    lang: LanguageEnum.English,
                    flag: 'en',
                    title: 'English'
                },
                {
                    lang: LanguageEnum.Spanish,
                    flag: 'es',
                    title: 'Español'
                },
                {
                    lang: LanguageEnum.German,
                    flag: 'de',
                    title: 'Deutsch'
                },
                {
                    lang: LanguageEnum.French,
                    flag: 'fr',
                    title: 'Français'
                },
                {
                    lang: LanguageEnum.Italian,
                    flag: 'it',
                    title: 'Italiano'
                },
                {
                    lang: LanguageEnum.Polish,
                    flag: 'pl',
                    title: 'Polski'
                },
                {
                    lang: LanguageEnum.Portugal,
                    flag: 'br',
                    title: 'Português (BR)'
                },
                {
                    lang: LanguageEnum.Russian,
                    flag: 'ru',
                    title: 'Русский'
                },
                {
                    lang: LanguageEnum.Vietnam,
                    flag: 'vn',
                    title: 'Tiếng Việt'
                },
                {
                    lang: LanguageEnum.Turkish,
                    flag: 'tr',
                    title: 'Türkçe'
                },
                {
                    lang: LanguageEnum.Catalan,
                    flag: 'cat',
                    title: 'Català'
                }
            ]
        }
    ]
})
export class AdvertiserTranslateModule {
    constructor(private readonly translateHttpLoaderService: TranslateHttpLoaderService, private readonly http: HttpClient) {
        this.translateHttpLoaderService.loader(httpLoaderFactory(this.http)).subscribe();
    }
}
