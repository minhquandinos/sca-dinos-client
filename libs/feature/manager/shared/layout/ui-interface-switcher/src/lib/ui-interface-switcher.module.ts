import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiDropdownModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { UiInterfaceSwitcherComponent } from './ui-interface-switcher.component';

@NgModule({
    declarations: [UiInterfaceSwitcherComponent],
    imports: [CommonModule, UiSvgIconModule, UiButtonLinkModule, UiDropdownModule, SharedModule],
    exports: [UiInterfaceSwitcherComponent]
})
export class UiInterfaceSwitcherModule {}
