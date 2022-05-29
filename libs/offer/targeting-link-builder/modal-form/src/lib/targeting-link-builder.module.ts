import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSwitchModule, FieldTextInfoModule, InputModule } from '@scaleo/shared/components';
import { FindAffiliatesModule, FindLandingPageModule, FindOfferModule, FindSmartLinkModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AddSubIdComponent } from './components/add-sub-id/add-sub-id.component';
import { TargetingLinkBuilderComponent } from './targeting-link-builder.component';

@NgModule({
    declarations: [TargetingLinkBuilderComponent, AddSubIdComponent],
    imports: [
        CommonModule,
        SharedModule,
        FindOfferModule,
        FindAffiliatesModule,
        SelectModule,
        CustomSwitchModule,
        InputModule,
        FieldTextInfoModule,
        FindSmartLinkModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        FindLandingPageModule
    ],
    exports: [TargetingLinkBuilderComponent]
})
export class TargetingLinkBuilderModule {}
