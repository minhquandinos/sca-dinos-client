import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { PaymentMethodsModel, PaymentMethodsRequestModel } from '../models/payment-methods.model';
import { PaymentMethodsApi } from './payment-methods.api';
import { PaymentMethodsQuery } from '../state/payment-methods.query';
import { PaymentMethodsStore } from '../state/payment-methods.store';

@Injectable()
export class PaymentMethodsService {
    get paymentsData(): Observable<PaymentMethodsModel[]> {
        return this.list();
    }

    readonly loadSubject$: Subject<void> = new Subject<void>();

    constructor(
        private api: PaymentMethodsApi,
        private store: PaymentMethodsStore,
        private readonly pathFileService: PathFileService,
        private query: PaymentMethodsQuery,
        private jsonConvertService: JsonConvertService
    ) {}

    public list(): Observable<PaymentMethodsModel[]> {
        return this.loadSubject$.pipe(
            startWith(''),
            switchMap(() => this.query.filters$),
            switchMap((filters: Filter2Interface) => this.api.list(filters)),
            map((payments: PaymentMethodsModel[]) => this.transformResponse(payments)),
            tap((res: PaymentMethodsModel[]) => {
                this.setToStore(res);
            })
        );
    }

    activePayments(): Observable<PaymentMethodsModel[]> {
        return this.loadSubject$.pipe(
            startWith(''),
            switchMap(() => this.query.filters$),
            switchMap((filters: Filter2Interface) => {
                const newFilters: Filter2Interface = {
                    ...filters,
                    params: {
                        ...filters.params,
                        status: 'active'
                    }
                };

                return this.api.list(newFilters);
            }),
            map((payments: PaymentMethodsModel[]) => this.transformResponse(payments)),
            tap((res: PaymentMethodsModel[]) => {
                this.setToStore(res);
            })
        );
    }

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

    // TODO refactor remove any
    private transformResponse(payments: PaymentMethodsModel[]): any[] {
        return payments.map((payment: PaymentMethodsModel) => ({
            ...payment,
            payment_method_logo: this.setPaymentLogo(payment.payment_method_logo)
        }));
    }

    private setToStore(response: PaymentMethodsModel[]): void {
        this.store.set(this.jsonConvertService.mapperArray(response, PaymentMethodsModel));
    }
}
