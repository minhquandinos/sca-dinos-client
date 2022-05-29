import { Provider } from '@angular/core';

import { DomainApi } from './domain.api';
import { DomainListService } from './domain-list.service';
import { DomainListQuery } from './state/domain-list.query';
import { DomainListStore } from './state/domain-list.store';

export const DOMAIN_LIST_PROVIDER: Provider[] = [DomainApi, DomainListService, DomainListQuery, DomainListStore];
