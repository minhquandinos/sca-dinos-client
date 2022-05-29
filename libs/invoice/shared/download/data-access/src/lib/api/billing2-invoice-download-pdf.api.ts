import { Injectable } from '@angular/core';

import { RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { exportDataUtil } from '@scaleo/utils';

@Injectable()
export class Billing2InvoiceDownloadPdfApi {
    constructor(private rest: RestApiService) {}

    download(id: number) {
        return exportDataUtil(this.rest, 'billing-invoice-download-pdf', { urlParameters: { id } });
    }

    downloadSelected(ids: number[]) {
        const params = RequestUtil.queryParams({
            ids: ids.join(',')
        });

        return exportDataUtil(this.rest, 'billing-invoice-download-selected-pdf', {
            params
        });
    }
}
