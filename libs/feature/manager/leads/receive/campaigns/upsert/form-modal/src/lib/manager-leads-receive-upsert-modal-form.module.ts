import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule, TextareaModule } from '@scaleo/shared/components';
import { FindGoalsModule, FindOfferModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { CampaignCreateComponent } from './campaign-create.component';
import { CampaignCreateFieldsModule } from './components/campaign-create-fields/campaign-create-fields.module';
import { CampaignFieldValidationsModule } from './components/campaign-field-validations/campaign-field-validations.module';

@NgModule({
    declarations: [CampaignCreateComponent],
    imports: [
        CommonModule,
        FindOfferModule,
        FindGoalsModule,
        SharedModule,
        InputModule,
        TextareaModule,
        CampaignCreateFieldsModule,
        CampaignFieldValidationsModule,
        Modal3EditFormModule,
        UiSkeletonModule,
        UiBrModule,
        UiButtonLinkModule,
        FindPlatformStatusesModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    exports: [CampaignCreateComponent]
})
export class ManagerLeadsReceiveUpsertModalFormModule {}
