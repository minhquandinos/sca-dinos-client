import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReferralLinkPipe } from './referral-link.pipe';

@NgModule({
    declarations: [ReferralLinkPipe],
    imports: [CommonModule],
    exports: [ReferralLinkPipe]
})
export class ReferralLinkModule {}
