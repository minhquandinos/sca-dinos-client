import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferTrackingSettingsEditModule } from '@scaleo/feature/manager/offer/tracking/settings/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { BooleanLabelModule, CustomInfoTooltipModule, FieldTextInfoModule } from '@scaleo/shared/components';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { InvalidTrafficForwardingViewComponent } from './components/invalid-traffic-forwarding-view/invalid-traffic-forwarding-view.component';
import { OfferTrackingSettingsComponent } from './offer-tracking-settings.component';
import { FailTrafficForwardingNamePipe } from './pipes/fail-traffic-forwarding-name.pipe';

@NgModule({
    declarations: [OfferTrackingSettingsComponent, InvalidTrafficForwardingViewComponent, FailTrafficForwardingNamePipe],
    imports: [
        CommonModule,
        DetailInfoModule,
        SharedModule,
        UiButtonLinkModule,
        FieldTextInfoModule,
        CustomInfoTooltipModule,
        BooleanLabelModule,
        OfferTrackingSettingsEditModule,
        PlatformFormatPipeModule
    ],
    exports: [OfferTrackingSettingsComponent]
})
export class OfferTrackingSettingsModule {}
