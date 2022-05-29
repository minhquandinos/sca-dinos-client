import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { DateVariantComponent } from './date-variant.component';

@NgModule({
    declarations: [DateVariantComponent],
    imports: [CommonModule, SharedModule],
    exports: [DateVariantComponent]
})
export class DateVariantModule {}
