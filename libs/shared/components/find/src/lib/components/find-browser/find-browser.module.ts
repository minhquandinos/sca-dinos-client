import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindBrowserComponent } from './find-browser.component';

@NgModule({
    declarations: [FindBrowserComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindBrowserComponent]
})
export class FindBrowserModule {}
