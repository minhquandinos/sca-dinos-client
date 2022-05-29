import { Provider } from '@angular/core';

import { PerformanceWidgetApi } from './api/performance-widget.api';
import { PerformanceWidgetFacade } from './facade/performance-widget.facade';
import { PerformanceWidgetState } from './state/performance-widget.state';

export const PERFORMANCE_WIDGET_PROVIDER: Provider[] = [PerformanceWidgetApi, PerformanceWidgetState, PerformanceWidgetFacade];
