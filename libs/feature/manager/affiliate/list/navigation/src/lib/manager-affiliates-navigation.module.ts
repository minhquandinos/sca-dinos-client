import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiBadgesModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerAffiliatesNavigationComponent } from './manager-affiliates-navigation.component';

@NgModule({
    declarations: [ManagerAffiliatesNavigationComponent],
    imports: [CommonModule, SharedModule, UiTabNavBarModule, RouterModule, UiBadgesModule, PlatformFormatPipeModule],
    exports: [ManagerAffiliatesNavigationComponent]
})
export class ManagerAffiliatesNavigationModule {}
