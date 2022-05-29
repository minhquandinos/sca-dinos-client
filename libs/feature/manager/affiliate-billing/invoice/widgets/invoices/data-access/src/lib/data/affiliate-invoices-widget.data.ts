import { Injectable } from '@angular/core';

import { BaseDataService } from '@scaleo/core/state/custom-state';

import { AffiliateInvoicesWidgetDataModel } from '../models/affiliate-invoices-widget.model';

@Injectable()
export class AffiliateInvoicesWidgetData extends BaseDataService<AffiliateInvoicesWidgetDataModel> {
    constructor() {
        super();
    }
}
