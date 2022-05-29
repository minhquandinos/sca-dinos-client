import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DASHBOARD_NAVIGATION_ROUTES } from '../navigations/dashboard-navigation';
import { ManagerAdvertiserNavigationService } from './manager-advertiser-navigation.service';
import { ManagerAffiliateNavigationService } from './manager-affiliate-navigation.service';
import { ManagerOfferNavigationService } from './manager-offer-navigation.service';
import { ManagerSettingsNavigationService } from './manager-settings-navigation.service';

@Injectable()
export class ManagerPathResolverService {
    constructor(
        public readonly offers: ManagerOfferNavigationService,
        public readonly settings: ManagerSettingsNavigationService,
        public readonly advertisers: ManagerAdvertiserNavigationService,
        public readonly affiliates: ManagerAffiliateNavigationService,
        private router: Router
    ) {}

    get dashboard(): string {
        return this.router.createUrlTree([DASHBOARD_NAVIGATION_ROUTES.root.absolute]).toString();
    }
}
