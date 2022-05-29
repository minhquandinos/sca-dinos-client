import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ShortResponseInterface } from '@scaleo/core/data';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { BaseFindRequestModel } from '@scaleo/shared/components/find';

import { FindInvoicesApi } from '../api/find-invoices.api';

@Injectable()
export class FindInvoicesService {
    constructor(private api: FindInvoicesApi) {}

    index(queryParams: BaseFindRequestModel): Observable<ApiResponseWithPagination<ShortResponseInterface[]>> {
        return this.api.index(queryParams);
    }
}
