import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { AffiliateDomainCreateComponent } from './affiliate-domain-create.component';

@NgModule({
    declarations: [AffiliateDomainCreateComponent],
    imports: [
        CommonModule,
        SharedModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        FindPlatformStatusesModule,
        InputModule
    ]
})
export class ManagerAffiliateDomainUpsertModule {}
