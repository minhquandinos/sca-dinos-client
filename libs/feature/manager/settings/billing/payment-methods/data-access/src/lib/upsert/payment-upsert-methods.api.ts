import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { PaymentMethodsModel, PaymentMethodsRequestModel } from '../models/payment-methods.model';

@Injectable()
export class PaymentUpsertMethodsApi {
    constructor(private rest: RestApiService) {}

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
