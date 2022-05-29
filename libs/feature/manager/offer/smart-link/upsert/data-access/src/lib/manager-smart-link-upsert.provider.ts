import { Provider } from '@angular/core';

import { ManagerSmartLinkUpsertApi } from './manager-smart-link-upsert.api';
import { ManagerSmartLinkUpsertService } from './manager-smart-link-upsert.service';

export const MANAGER_SMART_LINK_UPSERT_PROVIDER: Provider[] = [ManagerSmartLinkUpsertApi, ManagerSmartLinkUpsertService];
