import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiButtonLinkModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { ReferralsListComponent } from './referrals-list.component';

@NgModule({
    declarations: [ReferralsListComponent],
    imports: [CommonModule, UiTableModule, UiSkeletonModule, PlatformFormatPipeModule, UiButtonLinkModule, RouterModule],
    exports: [ReferralsListComponent]
})
export class ReferralsListModule {}
