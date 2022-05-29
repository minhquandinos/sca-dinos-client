import { Provider } from '@angular/core';

import { ManagerSmartLinkListApi } from './api/manager-smart-link-list.api';
import { ManagerSmartLinkListQuery } from './state/manager-smart-link-list.query';
import { ManagerSmartLinkListService } from './state/manager-smart-link-list.service';
import { ManagerSmartLinkListStore } from './state/manager-smart-link-list.store';

export const MANAGER_SMART_LINK_LIST_PROVIDER: Provider[] = [
    ManagerSmartLinkListApi,
    ManagerSmartLinkListQuery,
    ManagerSmartLinkListStore,
    ManagerSmartLinkListService
];
