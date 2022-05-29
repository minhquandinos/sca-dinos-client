import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageType } from '@scaleo/platform/language/init';

@Injectable({
    providedIn: 'root'
})
export class LanguageSwitcherService {
    constructor(private translate: TranslateService) {}

    private static setToLocalStorage(lang: LanguageType): void {
        localStorage.setItem('scaleo__lang', lang);
    }

    switchLanguage(lang: LanguageType): void {
        this.translate.use(lang);
        LanguageSwitcherService.setToLocalStorage(lang);
    }
}
