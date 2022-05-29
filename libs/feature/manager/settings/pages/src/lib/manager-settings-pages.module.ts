import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { StickyModule } from '@scaleo/shared/directives';
import { SidenavModule } from '@scaleo/ui-kit/elements';

import { ManagerSettingsLayoutComponent } from './manager-settings-layout.component';
import { ManagerSettingsPagesRoutingModule } from './manager-settings-pages-routing.module';

@NgModule({
    imports: [CommonModule, SidenavModule, ManagerSettingsPagesRoutingModule, FlexModule, StickyModule],
    declarations: [ManagerSettingsLayoutComponent]
})
export class ManagerSettingsPagesModule {}
