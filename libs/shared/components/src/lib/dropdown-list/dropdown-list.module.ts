import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownDirectiveModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { StatusColorModule } from '../statusses/status-color';
import { DropdownListComponent } from './dropdown-list.component';

@NgModule({
    declarations: [DropdownListComponent],
    imports: [CommonModule, SharedModule, StatusColorModule, UiSvgIconModule, DropdownDirectiveModule],
    exports: [DropdownListComponent]
})
export class DropdownListModule {}
