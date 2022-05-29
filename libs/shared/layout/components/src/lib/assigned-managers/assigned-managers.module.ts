import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomInfoModule } from '@scaleo/shared/components';
import { ContactIconModule } from '@scaleo/shared/components/contact';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AssignedManagersComponent } from './assigned-managers.component';

@NgModule({
    declarations: [AssignedManagersComponent],
    exports: [AssignedManagersComponent],
    imports: [CommonModule, ContactIconModule, UiSvgIconModule, CustomInfoModule, SharedModule, TruncateTextPipeModule]
})
export class AssignedManagersModule {}
