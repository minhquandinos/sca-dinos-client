import { Provider } from '@angular/core';

import { ManagerOfferListApi } from './api/manager-offer-list.api';
import { ManagerOfferListQuery } from './state/manager-offer-list.query';
import { ManagerOfferListService } from './state/manager-offer-list.service';
import { managerOfferListStorage, ManagerOfferListStore } from './state/manager-offer-list.store';

export const MANAGER_OFFER_LIST_PROVIDER: Provider[] = [
    ManagerOfferListApi,
    ManagerOfferListStore,
    ManagerOfferListQuery,
    ManagerOfferListService,
    {
        provide: 'persistStorage',
        useValue: managerOfferListStorage,
        multi: true
    }
];
