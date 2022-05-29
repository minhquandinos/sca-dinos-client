import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { PaymentMethodsModel, PaymentMethodsRequestModel } from '../models/payment-methods.model';
import { PaymentUpsertMethodsApi } from './payment-upsert-methods.api';

@Injectable()
export class PaymentUpsertMethodsService {
    constructor(
        private api: PaymentUpsertMethodsApi,
        private readonly pathFileService: PathFileService,
        private jsonConvertService: JsonConvertService
    ) {}

    public update(post: PaymentMethodsRequestModel, id: number): Observable<PaymentMethodsRequestModel> {
        if (post.payment_method_logo) {
            delete post.payment_method_logo;
        }

        return this.api.update(post, id);
    }

    public create(post: PaymentMethodsRequestModel): Observable<PaymentMethodsRequestModel> {
        return this.api.create(post);
    }

    public delete(id: number): Observable<any> {
        return this.api.delete(id);
    }

    public view(id: number): Observable<PaymentMethodsModel> {
        return this.api.view(id).pipe(
            map((payment) => ({
                ...payment,
                image_data: this.setPaymentLogo(payment.payment_method_logo)
            })),
            map((payment) => this.jsonConvertService.mapperObject(payment, PaymentMethodsModel))
        );
    }

    public deleteImage(id: number): Observable<any> {
        return this.api.deleteImage(id);
    }

    private setPaymentLogo(logo: string): string {
        return this.pathFileService.platformImage(logo, 'payments-methods');
    }
}
