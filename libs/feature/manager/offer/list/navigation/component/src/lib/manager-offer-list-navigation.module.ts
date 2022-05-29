import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { UiBadgesModule, UiDividerModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerOfferListNavigationComponent } from './manager-offer-list-navigation/manager-offer-list-navigation.component';

@NgModule({
    imports: [
        CommonModule,
        UiTabNavBarModule,
        SharedModule,
        UiDividerModule,
        CustomInfoTooltipModule,
        PlatformFormatPipeModule,
        UiBadgesModule,
        RouterModule
    ],
    declarations: [ManagerOfferListNavigationComponent],
    exports: [ManagerOfferListNavigationComponent]
})
export class ManagerOfferListNavigationModule {}
