import { Provider } from '@angular/core';

import { DomainApi } from './domain.api';
import { DomainWidgetListService } from './domain-widget-list.service';

export const DOMAIN_WIDGET_LIST_PROVIDER: Provider[] = [DomainApi, DomainWidgetListService];
