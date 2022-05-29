import { NgModule } from '@angular/core';

import { SettingsBrandingApi } from './api/settings-branding.api';
import { SettingsBrandingService } from './services/settings-branding.service';

@NgModule({
    providers: [SettingsBrandingService, SettingsBrandingApi]
})
export class ManagerDataAccessSettingsBrandingModule {}
