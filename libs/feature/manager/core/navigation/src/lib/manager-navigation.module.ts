import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NAVIGATION_PATH_TOKEN } from '@scaleo/core/navigation/common';

import { ManagerAdvertiserNavigationService } from './services/manager-advertiser-navigation.service';
import { ManagerAffiliateNavigationService } from './services/manager-affiliate-navigation.service';
import { ManagerPathResolverService } from './services/manager-navigation.service';
import { ManagerOfferNavigationService } from './services/manager-offer-navigation.service';
import { ManagerSettingsNavigationService } from './services/manager-settings-navigation.service';

@NgModule({
    imports: [CommonModule],
    providers: [
        ManagerOfferNavigationService,
        ManagerSettingsNavigationService,
        ManagerAdvertiserNavigationService,
        ManagerAffiliateNavigationService,
        {
            provide: NAVIGATION_PATH_TOKEN,
            useClass: ManagerPathResolverService
        }
    ]
})
export class ManagerNavigationModule {}
