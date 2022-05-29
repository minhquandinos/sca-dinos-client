import { NgModule } from '@angular/core';

import { SettingsAffiliateSignupApi } from './settings-affiliate-signup.api';
import { SettingsAffiliateSignupService } from './settings-affiliate-signup.service';

@NgModule({
    providers: [SettingsAffiliateSignupApi, SettingsAffiliateSignupService]
})
export class DataAccessSettingsAffiliatesSignupModule {}
