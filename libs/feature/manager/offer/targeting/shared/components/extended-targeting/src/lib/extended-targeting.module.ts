import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { FindPlatformListModule } from '../../../../../../../../../shared/components/find/src/lib/components/find-platform-list/find-platform-list.module';
import { SelectModule } from '../../../../../../../../../shared/components/select/src/lib/select.module';
import { CustomTranslatePipeModule } from '../../../../../../../../../shared/pipes/src/lib/custom-translate/custom-translate-pipe.module';
import { ExtendedTargetingComponent } from './extended-targeting.component';
import { ExtendedTargetingItemComponent } from './extended-targeting-item.component';
import { ExtendedTargetingSwitchKeyPipe } from './extended-targeting-switch-key.pipe';

@NgModule({
    declarations: [ExtendedTargetingComponent, ExtendedTargetingItemComponent, ExtendedTargetingSwitchKeyPipe],
    exports: [ExtendedTargetingComponent],
    imports: [
        CommonModule,
        SelectModule,
        InputModule,
        UiButtonLinkModule,
        SharedModule,
        UiSvgIconModule,
        FindPlatformListModule,
        CustomTranslatePipeModule
    ]
})
export class ExtendedTargetingModule {}
