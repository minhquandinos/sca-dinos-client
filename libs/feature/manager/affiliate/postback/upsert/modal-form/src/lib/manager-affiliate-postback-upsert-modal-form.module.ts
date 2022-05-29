import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { TextareaModule } from '@scaleo/shared/components';
import { FindGoalsModule, FindOfferModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiPageWrapperModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { ManagerPostbackCreateComponent } from './manager-postback-create.component';

@NgModule({
    declarations: [ManagerPostbackCreateComponent],
    exports: [ManagerPostbackCreateComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        TextareaModule,
        AvailableMacrosModule,
        FindOfferModule,
        FindGoalsModule,
        FindPlatformStatusesModule,
        CustomTranslatePipeModule,
        Modal3EditFormModule,
        FindPlatformListModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class ManagerAffiliatePostbackUpsertModalFormModule {}
