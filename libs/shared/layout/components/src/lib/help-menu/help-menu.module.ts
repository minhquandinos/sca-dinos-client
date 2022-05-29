import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownEntityMenuModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { HelpMenuComponent } from './help-menu.component';

@NgModule({
    declarations: [HelpMenuComponent],
    exports: [HelpMenuComponent],
    imports: [CommonModule, UiSvgIconModule, DropdownEntityMenuModule]
})
export class HelpMenuModule {}
