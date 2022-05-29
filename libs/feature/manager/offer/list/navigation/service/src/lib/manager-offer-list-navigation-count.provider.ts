import { InjectionToken, Provider } from '@angular/core';

import { ManagerOfferListNavigationCountInterface } from './manager-offer-list-navigation-count.interface';
import { ManagerOfferListNavigationCountService } from './manager-offer-list-navigation-count.service';

export const MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN = new InjectionToken<ManagerOfferListNavigationCountInterface>(
    'ManagerOfferListToken'
);

export const MANAGER_OFFER_LIST_NAVIGATION_COUNT_PROVIDER: Provider = {
    provide: MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN,
    useClass: ManagerOfferListNavigationCountService
};
