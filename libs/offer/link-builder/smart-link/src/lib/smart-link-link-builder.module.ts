import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { LinkBuilderAddSubIdModule } from '@scaleo/offer/link-builder/shared/link-builder-add-sub-id';
import { CustomSwitchModule, FieldTextInfoModule, InputModule } from '@scaleo/shared/components';
import { FindAffiliatesModule, FindSmartLinkModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { SmartLinkLinkBuilderComponent } from './smart-link-link-builder.component';

@NgModule({
    declarations: [SmartLinkLinkBuilderComponent],
    imports: [
        CommonModule,
        SharedModule,
        FindAffiliatesModule,
        SelectModule,
        CustomSwitchModule,
        InputModule,
        FieldTextInfoModule,
        FindSmartLinkModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        LinkBuilderAddSubIdModule
    ],
    exports: [SmartLinkLinkBuilderComponent]
})
export class SmartLinkLinkBuilderModule {}
