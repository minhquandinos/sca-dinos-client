import { Provider } from '@angular/core';

import { LeadsListApi } from './api/leads-list.api';
import { LeadsListQuery } from './state/leads-list.query';
import { LeadsListService } from './state/leads-list.service';
import { LeadsListStore } from './state/leads-list.store';

export const MANAGER_LEADS_MANAGE_PROVIDER: Provider[] = [LeadsListApi, LeadsListStore, LeadsListQuery, LeadsListService];
