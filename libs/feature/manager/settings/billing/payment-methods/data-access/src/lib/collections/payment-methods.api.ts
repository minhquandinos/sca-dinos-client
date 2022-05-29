import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { PaymentMethodsModel, PaymentMethodsRequestModel } from '../models/payment-methods.model';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsApi {
    constructor(private rest: RestApiService) {}

    public list(filters: Filter2Interface): Observable<PaymentMethodsModel[]> {
        const params = QueryHelper.filtersHttpParams(filters.params);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest
            .get<ApiResponse<PaymentMethodsModel>>('payments-methods-list', options)
            .pipe(pluck('body', 'info', 'paymentsMethods'));
    }

    public view(id: number): Observable<PaymentMethodsModel> {
        return this.rest.get<PaymentMethodsModel>('payments-methods-view', { urlParameters: { id } }).pipe(pluck('info', 'paymentMethod'));
    }

    public update(post: PaymentMethodsRequestModel, id: number): Observable<PaymentMethodsRequestModel> {
        return this.rest.put<PaymentMethodsRequestModel>('payments-methods-update', post, { urlParameters: { id } });
    }

    public create(post: PaymentMethodsRequestModel): Observable<PaymentMethodsRequestModel> {
        return this.rest.post<PaymentMethodsRequestModel>('payments-methods-create', post);
    }

    public delete(id: number): Observable<any> {
        return this.rest.delete<any>('payments-methods-delete', { urlParameters: { id } });
    }

    public deleteImage(id: number): Observable<any> {
        return this.rest.delete<any>('payments-methods-delete-image', { urlParameters: { id } });
    }
}
