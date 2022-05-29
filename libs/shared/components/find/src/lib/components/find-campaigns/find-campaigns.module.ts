import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindCampaignsComponent } from './find-campaigns.component';
import { FindCampaignsService } from './find-campaigns.service';

@NgModule({
    declarations: [FindCampaignsComponent],
    exports: [FindCampaignsComponent],
    imports: [CommonModule, SelectModule, SharedModule],
    providers: [FindCampaignsService]
})
export class FindCampaignsModule {}
