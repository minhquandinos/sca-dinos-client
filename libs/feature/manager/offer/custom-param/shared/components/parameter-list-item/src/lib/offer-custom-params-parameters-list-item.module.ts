import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiChipModule } from '@scaleo/ui-kit/elements';

import { OfferCustomParamsParametersListItemComponent } from './offer-custom-params-parameters-list-item.component';
import { OfferCustomParamsFormatDataPipe } from './pipes/offer-custom-params-format-data.pipe';

@NgModule({
    declarations: [OfferCustomParamsParametersListItemComponent, OfferCustomParamsFormatDataPipe],
    imports: [CommonModule, UiChipModule],
    exports: [OfferCustomParamsParametersListItemComponent]
})
export class OfferCustomParamsParametersListItemModule {}
