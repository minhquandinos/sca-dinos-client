import { NgModule } from '@angular/core';

import { SettingsAdvertiserSignupApi } from './api/settings-advertiser-signup.api';
import { SettingsAdvertiserSignupService } from './service/settings-advertiser-signup.service';

@NgModule({
    providers: [SettingsAdvertiserSignupService, SettingsAdvertiserSignupApi]
})
export class ManagerDataAccessSettingsAdvertisersModule {}
