import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { TranslateRoleFactory } from './classes/role-additional-translate/translate-role-factory';
import { LanguageDefaultType, LanguageEnum, LanguageType } from './language.model';

@Injectable({
    providedIn: 'root'
})
export class LanguageInitService {
    private newTranslateForRole: TranslateRoleFactory;

    constructor(
        private readonly translate: TranslateService,
        private readonly profileQuery: ProfileQuery,
        private readonly settingsQuery: PlatformSettingsQuery
    ) {
        this.newTranslateForRole = new TranslateRoleFactory(profileQuery, translate);
    }

    async init(): Promise<any> {
        try {
            this.setDefaultLanguage();
            this.setUserLanguage();
            // this.newTranslateForRole.addTranslate();
        } catch (e) {
            console.log(e);
        }
    }

    private setUserLanguage(): void {
        let lang: LanguageType = this.getCurrentLang;

        lang = LanguageInitService.getDefaultLanguagesArray.includes(lang as LanguageType) ? lang : this.getUserSettingsLang;

        this.translate.use(lang);
    }

    private setDefaultLanguage(): void {
        this.translate.setDefaultLang(LanguageEnum.English);
    }

    private get getUserSettingsLang(): LanguageDefaultType {
        return this.settingsQuery.settings?.default_language as LanguageDefaultType;
    }

    private get getCurrentLang(): LanguageType {
        const userChooseLang: LanguageType = localStorage.getItem('scaleo__lang') as LanguageType;
        return userChooseLang || this.detectBrowserLang;
    }

    private static get getDefaultLanguagesArray(): LanguageType[] {
        return [
            LanguageEnum.Russian,
            LanguageEnum.English,
            LanguageEnum.Vietnam,
            LanguageEnum.Portugal,
            LanguageEnum.Spanish,
            LanguageEnum.Catalan
        ];
    }

    private get isAffiliateOrNoAuthInterface(): boolean {
        return this.profileQuery.role === DefaultRoleEnum.AffiliateManager || this.profileQuery.role === undefined;
    }

    private get detectBrowserLang(): LanguageType {
        const detectBrowserLang = this.translate.getBrowserLang();

        switch (detectBrowserLang) {
            case LanguageEnum.Russian:
            case 'be':
            case 'ua':
                return LanguageEnum.Russian;
            case LanguageEnum.Vietnam:
            case LanguageEnum.Spanish:
            case LanguageEnum.Portugal:
            case LanguageEnum.Catalan:
                return this.isAffiliateOrNoAuthInterface ? detectBrowserLang : this.getUserSettingsLang;
            case LanguageEnum.English:
            default:
                return this.getUserSettingsLang;
        }
    }
}
