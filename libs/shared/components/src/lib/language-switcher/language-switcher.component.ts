import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { LanguageEnum, LanguageModel, LANGUAGES_TOKEN, LanguageType } from '@scaleo/platform/language/init';
import { LanguageSwitcherService } from '@scaleo/platform/language/switch';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class LanguageSwitcherComponent implements OnInit {
    @Input() hiddenTitle: boolean;

    @Output() toggle: EventEmitter<LanguageType> = new EventEmitter<LanguageType>();

    @HostBinding('class') hostClass = 'language-switcher';

    readonly languages$ = this.languagesList$;

    constructor(
        private readonly translate: TranslateService,
        private readonly renderer: Renderer2,
        private readonly languageSwitcherService: LanguageSwitcherService,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly unsubscribe: UnsubscribeService,
        private profile: ProfileQuery,
        private platformSettingsQuery: PlatformSettingsQuery,
        @Inject(LANGUAGES_TOKEN) private readonly languages: LanguageModel[]
    ) {}

    ngOnInit(): void {
        this.translate.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe((event: LangChangeEvent) => {
            this.renderer.setAttribute(this.document.body, 'lang', event.lang);
        });
    }

    public changeLanguage(lang: LanguageType): void {
        this.languageSwitcherService.switchLanguage(lang);
        this.toggle.emit(lang);
    }

    private get languagesList$(): Observable<LanguageModel[]> {
        return this.profile.role$.pipe(
            map(() => {
                const languagesList = this.languages;
                const haveCurrentLangInLanguageList = languagesList.some((language) => language.lang === this.translate.currentLang);
                if (!haveCurrentLangInLanguageList) {
                    const { default_language: defaultLanguage } = this.platformSettingsQuery.settings;
                    this.languageSwitcherService.switchLanguage((defaultLanguage as LanguageType) || LanguageEnum.English);
                }
                return languagesList;
            })
        );
    }
}
