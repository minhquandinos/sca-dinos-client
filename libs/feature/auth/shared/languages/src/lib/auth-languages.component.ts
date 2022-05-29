import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { LanguageType } from '@scaleo/platform/language/init';
import { DropdownEntityComponent } from '@scaleo/ui-kit/components/dropdown-entity';

@Component({
    selector: 'auth-languages', // app-language-select
    templateUrl: './auth-languages.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLanguagesComponent {
    openDropdown = false;

    selectedLanguage$: Observable<string>;

    @ViewChild(DropdownEntityComponent)
    private readonly dropdownEntity: DropdownEntityComponent;

    @Input() className = '';

    constructor(private translate: TranslateService) {
        this.selectedLanguage$ = this.getSelectedLanguage$;
    }

    dropdownStatus(event: boolean): void {
        this.openDropdown = event;
    }

    changeLanguage(): void {
        this.openDropdown = !this.openDropdown;
        this.dropdownEntity.close();
    }

    private get getSelectedLanguage$(): Observable<string> {
        return this.translate.onLangChange.pipe(
            startWith(this.translate.currentLang as LanguageType),
            filter((lang) => !!lang),
            map((lang: string | LangChangeEvent) => (typeof lang === 'string' ? lang : lang.lang))
        );
    }
}
