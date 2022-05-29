import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailInfoModule } from '@scaleo/ui-kit/elements';

import { ContactIconModule } from '../contact-icon/contact-icon.module';
import { ContactTitleByTypePipe } from './contact-title-by-type.pipe';
import { ContactsProfileComponent } from './contacts-profile.component';

@NgModule({
    declarations: [ContactsProfileComponent, ContactTitleByTypePipe],
    imports: [CommonModule, ContactIconModule, DetailInfoModule],
    exports: [ContactsProfileComponent]
})
export class ContactsProfileModule {}
