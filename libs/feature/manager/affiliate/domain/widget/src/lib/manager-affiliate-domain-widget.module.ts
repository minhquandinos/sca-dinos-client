import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CardWidgetModule, UpgradePlanInfoModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiButtonLinkModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { AffiliateProfileDomainsComponent } from './affiliate-profile-domains.component';

@NgModule({
    declarations: [AffiliateProfileDomainsComponent],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        SharedModule,
        UiSimpleTableModule,
        PlatformFormatPipeModule,
        TableNavigationModule,
        RouterModule,
        CardWidgetModule,
        UpgradePlanInfoModule
    ],
    exports: [AffiliateProfileDomainsComponent]
})
export class ManagerAffiliateDomainWidgetModule {}
