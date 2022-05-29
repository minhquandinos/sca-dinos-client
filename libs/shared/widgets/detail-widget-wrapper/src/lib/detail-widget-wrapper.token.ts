import { InjectionToken } from '@angular/core';

import { DetailWidgetWrapperInterface } from './detail-widget-wrapper.interface';

export const DETAIL_WIDGET_WRAPPER_TOKEN = new InjectionToken<DetailWidgetWrapperInterface>('DetailWidgetWrapperInterface');
