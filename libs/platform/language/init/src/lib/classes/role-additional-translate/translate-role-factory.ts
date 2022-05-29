import { TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BASE_ROLE } from '@scaleo/platform/role/models';

import { TranslateAdvertiser } from './translate-advertiser';
import { TranslateDefault } from './translate-default';

export class TranslateRoleFactory {
    constructor(private profileQuery: ProfileQuery, protected translate: TranslateService) {}

    addTranslate() {
        this.profileQuery.profile$.subscribe((profile) => {
            if (profile) {
                switch (profile.base_role) {
                    case BASE_ROLE.advertiserManager:
                        this.translate.onLangChange.pipe(startWith({ lang: this.translate.currentLang })).subscribe((lang) => {
                            this.translate.setTranslation(
                                lang.lang,
                                {
                                    ...TranslateAdvertiser.translateSchema[lang.lang]
                                },
                                true
                            );
                        });
                        break;
                    default:
                        // TODO FIXED
                        this.translate.onLangChange.pipe(startWith({ lang: this.translate.currentLang })).subscribe((lang) => {
                            this.translate.setTranslation(
                                lang.lang,
                                {
                                    ...TranslateDefault.translateSchema[lang.lang]
                                },
                                true
                            );
                        });
                        break;
                }
            }
        });
    }
}
