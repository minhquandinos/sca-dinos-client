import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { NavigateRootModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AdvertiserProfileQuickLinksComponent } from './advertiser-profile-quick-links.component';

@NgModule({
    declarations: [AdvertiserProfileQuickLinksComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, RouterModule, NavigateRootModule],
    exports: [AdvertiserProfileQuickLinksComponent]
})
export class AdvertiserProfileQuickLinksModule {}
