import { Provider } from '@angular/core';

import { BalanceWidgetApi } from './api/balance-widget.api';
import { BalanceWidgetQuery } from './state/balance-widget.query';
import { BalanceWidgetService } from './state/balance-widget.service';
import { BalanceWidgetStore } from './state/balance-widget.store';

export const BALANCE_WIDGET_PROVIDER: Provider[] = [BalanceWidgetApi, BalanceWidgetStore, BalanceWidgetService, BalanceWidgetQuery];
