import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ApiAccessModule, FieldTextInfoModule, HyperlinkModule, InputModule, NavigateRootModule } from '@scaleo/shared/components';
import { FindSponsorModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateDetailSettingsComponent } from './affiliate-detail-settings.component';
import { AffiliateDetailSettingsEditComponent } from './components/affiliate-detail-settings-edit/affiliate-detail-settings-edit.component';

@NgModule({
    declarations: [AffiliateDetailSettingsComponent, AffiliateDetailSettingsEditComponent],
    imports: [
        CommonModule,
        ApiAccessModule,
        FindSponsorModule,
        SelectModule,
        InputModule,
        DetailInfoModule,
        SharedModule,
        IsTruthyModule,
        UiButtonLinkModule,
        FieldTextInfoModule,
        RouterModule,
        NavigateRootModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    exports: [AffiliateDetailSettingsComponent]
})
export class AffiliateDetailSettingsModule {}
