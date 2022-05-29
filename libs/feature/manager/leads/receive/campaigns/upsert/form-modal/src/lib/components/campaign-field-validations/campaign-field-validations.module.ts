import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { TextareaModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipe, CustomTranslatePipeModule, IsTruthyModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { CampaignFieldValidationsComponent } from './campaign-field-validations.component';
import { CampaignFieldValidationsService } from './campaign-field-validations.service';
import { CampaignFieldValidationComponent } from './components/campaign-field-validation/campaign-field-validation.component';
import { CampaignFieldValidationSelectPlatformListPipe } from './components/campaign-field-validation/campaign-field-validation-select-platform-list.pipe';
import { CampaignFieldValidationSelectPlatformTranslateKeyPipe } from './components/campaign-field-validation/campaign-field-validation-select-platform-translate-key.pipe';

@NgModule({
    declarations: [
        CampaignFieldValidationsComponent,
        CampaignFieldValidationComponent,
        CampaignFieldValidationSelectPlatformListPipe,
        CampaignFieldValidationSelectPlatformTranslateKeyPipe
    ],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        SharedModule,
        SelectModule,
        UiSvgIconModule,
        TextareaModule,
        IsTruthyModule,
        FindPlatformListModule,
        CustomTranslatePipeModule
    ],
    providers: [CampaignFieldValidationsService, CustomTranslatePipe],
    exports: [CampaignFieldValidationsComponent]
})
export class CampaignFieldValidationsModule {}
