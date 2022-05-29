import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputDateModule, InputModule } from '@scaleo/shared/components';
import {
    FindAffiliatesModule,
    FindGoalsModule,
    FindOfferModule,
    FindPlatformListModule,
    FindPlatformStatusesModule
} from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ConditionRowComponent } from './components/condition-row/condition-row.component';
import { OfferCustomParameterConditionsComponent } from './components/offer-custom-parameter-conditions/offer-custom-parameter-conditions.component';
import { OfferCustomParameterParametersComponent } from './components/offer-custom-parameter-parameters/offer-custom-parameter-parameters.component';
import { ParameterRowComponent } from './components/parameter-row/parameter-row.component';
import { OfferCustomParameterCreateComponent } from './offer-custom-parameter-create.component';
import { IsConditionIdPipe } from './pipes/is-condition-id.pipe';

@NgModule({
    declarations: [
        OfferCustomParameterCreateComponent,
        OfferCustomParameterConditionsComponent,
        ConditionRowComponent,
        OfferCustomParameterParametersComponent,
        ParameterRowComponent,
        IsConditionIdPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        FindAffiliatesModule,
        InputDateModule,
        Modal3EditFormModule,
        FindPlatformStatusesModule,
        FindGoalsModule,
        FindOfferModule,
        InputModule,
        UiSvgIconModule,
        FindPlatformListModule,
        SelectModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class OfferCustomParameterCreateModule {}
