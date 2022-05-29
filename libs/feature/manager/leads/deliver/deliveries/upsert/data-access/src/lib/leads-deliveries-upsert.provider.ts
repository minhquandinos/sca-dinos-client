import { Provider } from '@angular/core';

import { LeadsDeliveriesUpsertApi } from './api/leads-deliveries-upsert.api';
import { LeadsDeliveriesUpsertService } from './leads-deliveries-upsert.service';

export const LEADS_DELIVERY_UPSERT_PROVIDER: Provider[] = [LeadsDeliveriesUpsertApi, LeadsDeliveriesUpsertService];
