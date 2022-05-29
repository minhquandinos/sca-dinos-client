import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { AllowedTagsModule, CustomInfoModule } from '@scaleo/shared/components';
import { JoinPipeModule } from '@scaleo/shared/pipes';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferCustomParamsConditionJoinTitlesPipe } from './offer-custom-params-condition-join-titles.pipe';
import { OfferCustomParamsConditionTitlePipe } from './offer-custom-params-condition-title.pipe';
import { OfferCustomParamsConditionsListItemComponent } from './offer-custom-params-conditions-list-item.component';

@NgModule({
    declarations: [
        OfferCustomParamsConditionsListItemComponent,
        OfferCustomParamsConditionTitlePipe,
        OfferCustomParamsConditionJoinTitlesPipe
    ],
    exports: [OfferCustomParamsConditionsListItemComponent],
    imports: [CommonModule, CustomInfoModule, AllowedTagsModule, UiSvgIconModule, SharedModule, JoinPipeModule, PlatformListTranslateModule]
})
export class OfferCustomParamsConditionsListItemModule {}
