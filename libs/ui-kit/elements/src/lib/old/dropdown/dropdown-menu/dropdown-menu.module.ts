import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiButtonLinkModule } from '../../../ui-button-link';
import { DropdownDirectiveModule } from '../dropdown-directive.module';
import { DropdownMenuComponent } from './dropdown-menu.component';

@NgModule({
    declarations: [DropdownMenuComponent],
    exports: [DropdownMenuComponent],
    imports: [CommonModule, UiButtonLinkModule, DropdownDirectiveModule, SharedModule]
})
export class DropdownMenuModule {}
