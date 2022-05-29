import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule } from '@scaleo/shared/components';
import { DropdownMenuModule } from '@scaleo/ui-kit/elements';

import { ManagerConversionsChangeStatusComponent } from './manager-conversions-change-status.component';

@NgModule({
    declarations: [ManagerConversionsChangeStatusComponent],
    imports: [CommonModule, DropdownMenuModule, SharedModule, CustomCheckboxModule],
    exports: [ManagerConversionsChangeStatusComponent]
})
export class ManagerConversionsChangeStatusModule {}
