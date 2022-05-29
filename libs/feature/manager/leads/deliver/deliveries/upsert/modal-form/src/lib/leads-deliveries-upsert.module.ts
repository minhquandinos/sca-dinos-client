import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { InputModule, LinkToBeaconModule, TextareaModule } from '@scaleo/shared/components';
import { FindCampaignsModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { LeadsDeliveriesUpsertComponent } from './leads-deliveries-upsert.component';

@NgModule({
    declarations: [LeadsDeliveriesUpsertComponent],
    imports: [
        CommonModule,
        SharedModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule,
        UiButtonLinkModule,
        FindPlatformStatusesModule,
        FindCampaignsModule,
        TextareaModule,
        LinkToBeaconModule,
        InputModule,
        AvailableMacrosModule
    ]
})
export class LeadsDeliveriesUpsertModule {}
