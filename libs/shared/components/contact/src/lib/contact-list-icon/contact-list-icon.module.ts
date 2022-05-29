import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ContactIconModule } from '../contact-icon/contact-icon.module';
import { ContactListIconComponent } from './contact-list-icon.component';

@NgModule({
    declarations: [ContactListIconComponent],
    exports: [ContactListIconComponent],
    imports: [CommonModule, ContactIconModule, UiSvgIconModule, SharedModule]
})
export class ContactListIconModule {}
