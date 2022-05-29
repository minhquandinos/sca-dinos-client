import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';
import { ValidationMethods } from '@scaleo/shared/validators';
import { UiChipModule, UiImageModule } from '@scaleo/ui-kit/elements';

import { FindCountryComponent } from './find-country.component';

@NgModule({
    declarations: [FindCountryComponent],
    imports: [CommonModule, SharedModule, SelectModule, UiChipModule, UiImageModule],
    exports: [FindCountryComponent],
    providers: [ValidationMethods]
})
export class FindCountryModule {}
