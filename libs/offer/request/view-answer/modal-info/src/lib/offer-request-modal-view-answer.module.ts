import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferRequestModalViewAnswerComponent } from './offer-request-modal-view-answer.component';

@NgModule({
    declarations: [OfferRequestModalViewAnswerComponent],
    exports: [OfferRequestModalViewAnswerComponent],
    imports: [CommonModule, UiButtonLinkModule, FieldTextInfoModule, SharedModule]
})
export class OfferRequestModalViewAnswerModule {}
