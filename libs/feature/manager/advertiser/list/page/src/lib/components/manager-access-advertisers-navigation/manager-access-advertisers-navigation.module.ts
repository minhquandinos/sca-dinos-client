import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiBadgesModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerAccessAdvertisersNavigationComponent } from './manager-access-advertisers-navigation.component';

@NgModule({
    declarations: [ManagerAccessAdvertisersNavigationComponent],
    imports: [CommonModule, SharedModule, UiTabNavBarModule, RouterModule, UiBadgesModule, PlatformFormatPipeModule],
    exports: [ManagerAccessAdvertisersNavigationComponent]
})
export class ManagerAccessAdvertisersNavigationModule {}
