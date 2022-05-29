import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';

import { SharedModule } from '@scaleo/core/shared/module';

import { DropdownMenuModule } from '../../../old/dropdown/dropdown-menu/dropdown-menu.module';
import { UiButtonLinkModule } from '../../../ui-button-link';
import { UiSvgIconModule } from '../../../ui-svg-icon';
import { TableNavigationComponent } from './table-navigation.component';
import { TableNavigationDropdownDirective } from './table-navigation-dropdown.directive';

@NgModule({
    declarations: [TableNavigationComponent, TableNavigationDropdownDirective],
    imports: [CommonModule, UiSvgIconModule, UiButtonLinkModule, DropdownMenuModule, TooltipModule, SharedModule],
    exports: [TableNavigationComponent, TableNavigationDropdownDirective]
})
export class TableNavigationModule {}
