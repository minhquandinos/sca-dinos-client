import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindLanguagesComponent } from './find-languages.component';

@NgModule({
    declarations: [FindLanguagesComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindLanguagesComponent]
})
export class FindLanguagesModule {}
