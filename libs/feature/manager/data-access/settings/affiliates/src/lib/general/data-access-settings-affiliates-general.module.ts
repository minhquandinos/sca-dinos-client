import { NgModule } from '@angular/core';

import { SettingsAffiliateGeneralApi } from '../../../../../../settings/affiliates/general/data-access/src/lib/settings-affiliate-general.api';
import { SettingsAffiliateGeneralService } from '../../../../../../settings/affiliates/general/data-access/src/lib/settings-affiliate-general.service';

@NgModule({
    providers: [SettingsAffiliateGeneralApi, SettingsAffiliateGeneralService]
})
export class DataAccessSettingsAffiliatesGeneralModule {}
