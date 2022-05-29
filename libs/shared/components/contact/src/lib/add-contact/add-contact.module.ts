import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortablejsModule } from 'ngx-sortablejs';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AddContactComponent } from './add-contact.component';

@NgModule({
    declarations: [AddContactComponent],
    imports: [
        CommonModule,
        SharedModule,
        SortablejsModule.forRoot({ animation: 150 }),
        UiButtonLinkModule,
        UiSvgIconModule,
        InputModule,
        SelectModule
    ],
    exports: [AddContactComponent]
})
export class AddContactModule {}
