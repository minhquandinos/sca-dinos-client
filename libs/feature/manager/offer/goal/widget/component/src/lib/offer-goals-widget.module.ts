import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferGoalsColumnsModule } from '@scaleo/feature/manager/offer/goal/shared/components/offer-goal-columns';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { BooleanLabelModule, CardWidgetModule, CustomPaginationModule } from '@scaleo/shared/components';
import { GoalTypePipeModule } from '@scaleo/shared/pipes';
import { TableNavigationModule, UiButtonLinkModule, UiChipModule, UiSimpleTableModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferGoalsWidgetComponent } from './offer-goals-widget.component';

@NgModule({
    declarations: [OfferGoalsWidgetComponent],
    imports: [
        CommonModule,
        CardWidgetModule,
        UiButtonLinkModule,
        SharedModule,
        RouterModule,
        UiSimpleTableModule,
        TableNavigationModule,
        UiSvgIconModule,
        UiChipModule,
        GoalTypePipeModule,
        PlatformFormatPipeModule,
        PlatformStatusesModule,
        BooleanLabelModule,
        OfferGoalsColumnsModule,
        CustomPaginationModule
    ],
    exports: [OfferGoalsWidgetComponent]
})
export class OfferGoalsWidgetModule {}
