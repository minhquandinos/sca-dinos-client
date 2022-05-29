import { Provider } from '@angular/core';

import { NetworkSummeryWidgetApi } from './api/network-summery-widget.api';
import { NetworkSummaryWidgetService } from './services/network-summary-widget.service';

export const NETWORK_SUMMARY_WIDGET_PROVIDER: Provider[] = [NetworkSummeryWidgetApi, NetworkSummaryWidgetService];
