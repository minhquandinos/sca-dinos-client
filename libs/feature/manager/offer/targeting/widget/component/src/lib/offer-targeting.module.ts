import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferTargetingEditModule } from '@scaleo/feature/manager/offer/targeting/upsert/modal-form';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { AllowedTagsModule, BooleanLabelModule, CardWidgetModule } from '@scaleo/shared/components';
import { GeoPipeModule, IsTruthyModule, TypeofPipeModule } from '@scaleo/shared/pipes';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferTargetingWidgetComponent } from './offer-targeting-widget.component';
import { OfferTargetingConditionTitlePipe } from './pipes/offer-targeting-condition-title.pipe';

@NgModule({
    declarations: [OfferTargetingWidgetComponent, OfferTargetingConditionTitlePipe],
    imports: [
        CommonModule,
        CardWidgetModule,
        UiButtonLinkModule,
        SharedModule,
        AllowedTagsModule,
        PlatformListTranslateModule,
        BooleanLabelModule,
        OfferTargetingEditModule,
        GeoPipeModule,
        DetailInfoModule,
        TypeofPipeModule,
        IsTruthyModule
    ],
    exports: [OfferTargetingWidgetComponent]
})
export class OfferTargetingModule {}
