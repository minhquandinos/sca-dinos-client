import { Provider } from '@angular/core';

import { DomainApi } from './domain.api';
import { DomainUpsertService } from './domain-upsert.service';

export const DOMAIN_UPSERT_PROVIDER: Provider[] = [DomainApi, DomainUpsertService];
