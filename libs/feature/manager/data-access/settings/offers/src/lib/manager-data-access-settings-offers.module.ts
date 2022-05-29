import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OffersSettingsApi } from './api/offers-settings.api';
import { OffersSettingsService } from './service/offers-settings.service';

@NgModule({
    imports: [CommonModule],
    providers: [OffersSettingsService, OffersSettingsApi]
})
export class ManagerDataAccessSettingsOffersModule {}
