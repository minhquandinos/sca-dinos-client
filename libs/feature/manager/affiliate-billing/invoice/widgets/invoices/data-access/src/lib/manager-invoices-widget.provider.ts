import { Provider } from '@angular/core';

import { ManagerInvoicesWidgetApi } from './api/manager-invoices-widget.api';
import { ManagerInvoicesWidgetService } from './services/manager-invoices-widget.service';
import { ManagerInvoicesWidgetQuery } from './state/manager-invoices-widget.query';
import { ManagerInvoicesWidgetStore } from './state/manager-invoices-widget.store';

export const MANAGER_INVOICES_WIDGET_PROVIDER: Provider[] = [
    ManagerInvoicesWidgetApi,
    ManagerInvoicesWidgetQuery,
    ManagerInvoicesWidgetStore,
    ManagerInvoicesWidgetService
];
