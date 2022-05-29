import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailInfoModule } from '@scaleo/ui-kit/elements';

import { CustomFieldViewComponent } from './components/custom-field-view/custom-field-view.component';
import { CustomFieldCheckboxValuePipe } from './pipes/custom-field-checkbox-value.pipe';

@NgModule({
    declarations: [CustomFieldViewComponent, CustomFieldCheckboxValuePipe],
    imports: [CommonModule, DetailInfoModule],
    exports: [CustomFieldViewComponent]
})
export class CustomFieldViewModule {}
