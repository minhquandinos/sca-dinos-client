import { Provider } from '@angular/core';

import { DeliveriesApi } from './api/deliveries.api';
import { DeliveriesQuery } from './state/deliveries.query';
import { DeliveriesService } from './state/deliveries.service';
import { DeliveriesStore } from './state/deliveries.store';

export const LEADS_DELIVERIES_PROVIDER: Provider[] = [DeliveriesApi, DeliveriesQuery, DeliveriesService, DeliveriesStore];
