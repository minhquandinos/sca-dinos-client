import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomSwitchModule, TextareaModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { MultiSelectBlockModule } from '@scaleo/shared/components2/multi-select-block';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { IsTruthyModule, TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferAffiliateAccessEditComponent } from './offer-affiliate-access-edit.component';

@NgModule({
    declarations: [OfferAffiliateAccessEditComponent],
    imports: [
        CommonModule,
        Modal3EditFormModule,
        SharedModule,
        UiButtonLinkModule,
        FindPlatformListModule,
        MultiSelectBlockModule,
        PlatformFormatPipeModule,
        UiBrModule,
        CustomSwitchModule,
        TextareaModule,
        IsTruthyModule,
        TruncateTextPipeModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class OfferAffiliateAccessEditModule {}
