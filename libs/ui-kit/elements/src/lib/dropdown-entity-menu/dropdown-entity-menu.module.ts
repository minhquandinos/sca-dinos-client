import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';

import { EntityListModule } from '../entity-list/entity-list.module';
import { UiButtonLinkModule } from '../ui-button-link/ui-button-link.module';
import { UiDividerModule } from '../ui-divider/ui-divider.module';
import { DropdownEntityMenuComponent } from './dropdown-entity-menu.component';

@NgModule({
    declarations: [DropdownEntityMenuComponent],
    imports: [CommonModule, UiDropdownEntityModule, UiButtonLinkModule, EntityListModule, UiDividerModule],
    exports: [DropdownEntityMenuComponent]
})
export class DropdownEntityMenuModule {}
