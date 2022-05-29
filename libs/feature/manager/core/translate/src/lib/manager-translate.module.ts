import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { TranslateHttpLoaderService } from '@scaleo/core/services/translate';
import { LanguageEnum, LANGUAGES_TOKEN } from '@scaleo/platform/language/init';

const httpLoaderFactory = (http: HttpClient): MultiTranslateHttpLoader =>
    new MultiTranslateHttpLoader(http, [
        { prefix: 'assets/i18n/feature/manager/', suffix: `.json` },
        { prefix: 'assets/i18n/feature/manager/invoice/', suffix: `.json` },
        { prefix: 'assets/i18n/feature/manager/settings/', suffix: `.json` }
    ]);

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
                    lang: LanguageEnum.Russian,
                    flag: 'ru',
                    title: 'Русский'
                }
            ]
        }
    ]
})
export class ManagerTranslateModule {
    constructor(private readonly translateHttpLoaderService: TranslateHttpLoaderService, private readonly http: HttpClient) {
        this.translateHttpLoaderService.loader(httpLoaderFactory(this.http)).subscribe();
    }
}
