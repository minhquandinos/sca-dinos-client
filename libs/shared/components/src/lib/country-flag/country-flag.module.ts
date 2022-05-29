import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiImageModule } from '@scaleo/ui-kit/elements';

import { CountryFlagComponent } from './country-flag.component';

@NgModule({
    declarations: [CountryFlagComponent],
    imports: [CommonModule, UiImageModule],
    exports: [CountryFlagComponent]
})
export class CountryFlagModule {}
