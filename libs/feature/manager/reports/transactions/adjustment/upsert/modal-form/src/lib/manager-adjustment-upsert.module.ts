import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomDateRangeModule, CustomSwitchModule, InputModule, TextareaModule } from '@scaleo/shared/components';
import { FindAffiliatesModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { ManagerAdjustmentUpsertComponent } from './manager-adjustment-upsert.component';
import { AddConditionsModule } from './shared/components/add-conditions/add-conditions.module';
import { AddParametersModule } from './shared/components/add-parameters/add-parameters.module';
import { AdjustmentDetailsModule } from './shared/components/adjustment-details/adjustment-details.module';
import { AdjustmentPayoutModule } from './shared/components/adjustment-payout/adjustment-payout.module';
import { DownloadConversionsViaCsvModule } from './shared/components/download-conversions-via-csv/download-conversions-via-csv.module';

@NgModule({
    declarations: [ManagerAdjustmentUpsertComponent],
    imports: [
        CommonModule,
        TextareaModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        SharedModule,
        CustomSwitchModule,
        InputModule,
        FindAffiliatesModule,
        CustomDateRangeModule,
        AddParametersModule,
        AdjustmentPayoutModule,
        AdjustmentDetailsModule,
        AddConditionsModule,
        DownloadConversionsViaCsvModule,
        FindPlatformStatusesModule,
        CustomTranslatePipeModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule,
        FindPlatformListModule
    ],
    exports: [ManagerAdjustmentUpsertComponent]
})
export class ManagerAdjustmentUpsertModule {}
