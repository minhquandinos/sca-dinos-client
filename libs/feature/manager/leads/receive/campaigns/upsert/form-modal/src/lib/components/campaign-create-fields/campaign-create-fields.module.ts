import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { CampaignCreateFieldComponent } from './campaign-create-field/campaign-create-field.component';
import { CampaignCreateFieldService } from './campaign-create-field/campaign-create-field.service';
import { CampaignCreateFieldsComponent } from './campaign-create-fields.component';
import { CampaignCreateFieldsGroupComponent } from './campaign-create-fields-group/campaign-create-fields-group.component';

@NgModule({
    declarations: [CampaignCreateFieldsComponent, CampaignCreateFieldComponent, CampaignCreateFieldsGroupComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule, UiSvgIconModule, InputModule, FindPlatformListModule],
    exports: [CampaignCreateFieldsComponent],
    providers: [CampaignCreateFieldService]
})
export class CampaignCreateFieldsModule {}
