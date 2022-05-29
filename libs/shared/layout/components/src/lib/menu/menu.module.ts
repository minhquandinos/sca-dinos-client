import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { NavigateRootModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
    declarations: [DesktopMenuComponent, MobileMenuComponent],
    imports: [CommonModule, UiSvgIconModule, RouterModule, SharedModule, NavigateRootModule],
    exports: [DesktopMenuComponent, MobileMenuComponent]
})
export class MenuModule {}
