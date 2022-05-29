import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthEndpointsModule } from '@scaleo/feature/auth/core/endpoints';
import { LanguageEnum, LANGUAGES_TOKEN } from '@scaleo/platform/language/init';

@NgModule({
    imports: [CommonModule, AuthEndpointsModule],
    providers: [
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
export class AuthCoreInitModule {}
