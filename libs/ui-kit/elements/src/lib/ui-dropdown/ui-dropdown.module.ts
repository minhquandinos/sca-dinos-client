import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiDropdownComponent } from './ui-dropdown.component';
import { UiDropdownContentDirective } from './ui-dropdown-content.directive';
import { UiDropdownContentService } from './ui-dropdown-content.service';

@NgModule({
    declarations: [UiDropdownComponent, UiDropdownContentDirective],
    imports: [CommonModule, OverlayModule],
    exports: [UiDropdownComponent],
    providers: [UiDropdownContentService]
})
export class UiDropdownModule {}
