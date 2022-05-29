import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ContactIconComponent } from './contact-icon.component';

@NgModule({
    declarations: [ContactIconComponent],
    imports: [CommonModule, SharedModule, UiSvgIconModule],
    exports: [ContactIconComponent]
})
export class ContactIconModule {}
