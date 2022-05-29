import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { FieldTextInfoComponent } from './field-text-info.component';

@NgModule({
    declarations: [FieldTextInfoComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule, ClipboardModule],
    exports: [FieldTextInfoComponent]
})
export class FieldTextInfoModule {}
