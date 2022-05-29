import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { DropdownDirectiveModule, UiBadgesModule, UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { DropdownPopupComponent } from './dropdown-popup.component';

@NgModule({
    declarations: [DropdownPopupComponent],
    exports: [DropdownPopupComponent],
    imports: [
        CommonModule,
        UiSvgIconModule,
        SharedModule,
        UiButtonLinkModule,
        UiBadgesModule,
        DropdownDirectiveModule,
        StopPropagationDirectiveModule
    ]
})
export class DropdownPopupModule {}
