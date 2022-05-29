import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { CardModule } from '@scaleo/ui-kit/elements';

import { OfferProfileCustomUrlComponent } from './offer-profile-custom-url.component';

@NgModule({
    declarations: [OfferProfileCustomUrlComponent],
    imports: [CommonModule, CardModule, FieldTextInfoModule, SharedModule],
    exports: [OfferProfileCustomUrlComponent]
})
export class OfferProfileCustomUrlModule {}
