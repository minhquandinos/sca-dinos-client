import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { UiBadgesModule } from '../../../../../ui-kit/elements/src/lib/ui-badges/ui-badges.module';
import { UiDividerModule } from '../../../../../ui-kit/elements/src/lib/ui-divider/ui-divider.module';
import { UiTabNavBarModule } from '../../../../../ui-kit/elements/src/lib/ui-tabs/ui-tab-nav-bar/ui-tab-nav-bar.module';
import { CustomInfoTooltipModule } from '../custom-info-tooltip/custom-info-tooltip.module';
import { ListNavBarComponent } from './list-nav-bar.component';

@NgModule({
    declarations: [ListNavBarComponent],
    exports: [ListNavBarComponent],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        PlatformFormatPipeModule,
        UiTabNavBarModule,
        UiBadgesModule,
        UiDividerModule,
        CustomInfoTooltipModule
    ]
})
export class ListNavBarModule {}
