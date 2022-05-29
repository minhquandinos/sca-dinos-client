import { NgModule } from '@angular/core';

import { GeneralSettingsApi } from './api/general-settings.api';
import { GeneralSettingsService } from './services/general-settings.service';

@NgModule({
    providers: [GeneralSettingsApi, GeneralSettingsService]
})
export class ManagerDataAccessSettingsGeneralModule {}
