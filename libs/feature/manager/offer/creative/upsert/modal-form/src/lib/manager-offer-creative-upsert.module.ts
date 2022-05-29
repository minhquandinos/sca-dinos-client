import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomFileUploadModule, CustomSwitchModule, InputModule, TextareaModule } from '@scaleo/shared/components';
import { FindLandingPageModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiChipModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { ManagerCreativeUpsertComponent } from './manager-creative-upsert.component';
import { IsCreativeTypePipe } from './pipes/is-creative-type.pipe';

@NgModule({
    declarations: [ManagerCreativeUpsertComponent, IsCreativeTypePipe],
    imports: [
        CommonModule,
        SharedModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        CustomFileUploadModule,
        CustomSwitchModule,
        InputModule,
        SelectModule,
        TextareaModule,
        UiChipModule,
        Modal3EditFormModule,
        FindPlatformListModule,
        FindPlatformStatusesModule,
        FindLandingPageModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    exports: [ManagerCreativeUpsertComponent]
})
export class ManagerOfferCreativeUpsertModule {}
