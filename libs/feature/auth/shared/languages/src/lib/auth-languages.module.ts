import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountryFlagModule, LanguageSwitcherModule } from '@scaleo/shared/components';
import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';
import { UiDropdownModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AuthLanguageFlagPipe } from './auth-language-flag.pipe';
import { AuthLanguagesComponent } from './auth-languages.component';

@NgModule({
    declarations: [AuthLanguagesComponent, AuthLanguageFlagPipe],
    imports: [CommonModule, UiDropdownEntityModule, UiSvgIconModule, LanguageSwitcherModule, CountryFlagModule, UiDropdownModule],
    exports: [AuthLanguagesComponent]
})
export class AuthLanguagesModule {}
