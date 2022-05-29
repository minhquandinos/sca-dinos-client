import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { DropdownEntityComponent } from './components/dropdown-entity/dropdown-entity.component';
import { DropdownEntityItemRefDirective } from './directives/dropdown-entity-item-ref.directive';
import { DropdownEntityTriggerForDirective } from './directives/dropdown-entity-trigger-for.directive';

@NgModule({
    declarations: [DropdownEntityComponent, DropdownEntityTriggerForDirective, DropdownEntityItemRefDirective],
    imports: [CommonModule, NgScrollbarModule, OverlayModule],
    exports: [DropdownEntityComponent, DropdownEntityTriggerForDirective, DropdownEntityItemRefDirective]
})
export class UiDropdownEntityModule {}
