import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { CountryFlagModule } from '../country-flag/country-flag.module';
import { LanguageSwitcherComponent } from './language-switcher.component';

@NgModule({
    declarations: [LanguageSwitcherComponent],
    exports: [LanguageSwitcherComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule, CountryFlagModule]
})
export class LanguageSwitcherModule {}
