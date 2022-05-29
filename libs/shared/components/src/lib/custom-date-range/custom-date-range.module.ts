import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { CustomDateRangeComponent } from './custom-date-range.component';
import { DefaultTimezoneComponent } from './default-timezone/default-timezone.component';

@NgModule({
    imports: [CommonModule, Daterangepicker, FormsModule, SharedModule, SelectModule],
    declarations: [CustomDateRangeComponent, DefaultTimezoneComponent],
    exports: [CommonModule, CustomDateRangeComponent]
})
export class CustomDateRangeModule {}
