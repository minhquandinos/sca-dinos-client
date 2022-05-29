import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { TextareaModule } from '@scaleo/shared/components';
import { FindGoalsModule, FindOfferModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { AffiliatePostbackUpsertComponent } from './affiliate-postback-upsert.component';

@NgModule({
    declarations: [AffiliatePostbackUpsertComponent],
    imports: [
        CommonModule,
        SharedModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        FindPlatformStatusesModule,
        FindPlatformListModule,
        FindOfferModule,
        FindGoalsModule,
        TextareaModule,
        UiSkeletonModule,
        AvailableMacrosModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class AffiliatePostbacksUpsertModalFormModule {}
