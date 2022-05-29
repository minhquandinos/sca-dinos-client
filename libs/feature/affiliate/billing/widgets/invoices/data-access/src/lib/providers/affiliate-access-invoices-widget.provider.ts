import { Provider } from '@angular/core';

import { AffiliateAccessInvoicesWidgetService } from '../services/affiliate-access-invoices-widget.service';
import { AffiliateAccessInvoicesWidgetQuery } from '../state/affiliate-access-invoices-widget.query';
import {
    AFFILIATE_ACCESS_INVOICES_WIDGET_QUERY_TOKEN,
    AFFILIATE_ACCESS_INVOICES_WIDGET_SERVICE_TOKEN
} from '../tokens/affiliate-access-invoice-widget.token';

export const AffiliateAccessInvoicesWidgetProvider: Provider[] = [
    {
        provide: AFFILIATE_ACCESS_INVOICES_WIDGET_SERVICE_TOKEN,
        useClass: AffiliateAccessInvoicesWidgetService
    },
    {
        provide: AFFILIATE_ACCESS_INVOICES_WIDGET_QUERY_TOKEN,
        useClass: AffiliateAccessInvoicesWidgetQuery
    }
];
