import { Injectable } from '@angular/core';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { InvoicesApi } from '@scaleo/invoice/data-access';

@Injectable()
export class ManagerInvoicesWidgetApi extends InvoicesApi {
    constructor(protected rest: RestApiService) {
        super(rest);
    }
}
