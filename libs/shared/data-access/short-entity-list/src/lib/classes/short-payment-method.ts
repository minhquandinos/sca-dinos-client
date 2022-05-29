import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortSponsorConfigModel } from '../models';
import { ShortPaymentMethodDto, ShortPaymentMethodModel } from '../models/short-payment-method.model';

export class ShortPaymentMethod implements ShortEntityListInterface<ApiResponseWithPagination<ShortPaymentMethodModel[]>> {
    constructor(private rest: RestApiService) {}

    list(config: ShortSponsorConfigModel): Observable<ApiResponseWithPagination<ShortPaymentMethodModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<ShortPaymentMethodDto[]>>('payments-methods-filters', options)
            .pipe(
                map(({ headers, body: { info } }) =>
                    ResponseUtil.pagination<ShortPaymentMethodModel[]>(headers, info?.['payment-method'] || [])
                )
            );
    }
}
