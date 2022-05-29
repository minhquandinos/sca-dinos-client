import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { BillingPreferencesApi } from '../api/billing-preferences.api';
import { AffiliateBillingPreferencesModel } from '../models/affiliate-billing-preferences.model';

@Injectable({
    providedIn: 'root'
})
export class BillingPreferencesService {
    constructor(private api: BillingPreferencesApi, private jsonConvertService: JsonConvertService) {}

    show(): Observable<AffiliateBillingPreferencesModel>;
    show(id: number): Observable<AffiliateBillingPreferencesModel>;
    show(id?: number): Observable<AffiliateBillingPreferencesModel> {
        return this.api.show(id).pipe(map((response) => this.jsonConvertService.mapper(AffiliateBillingPreferencesModel, response)));
    }

    update<T>(payload: T): Observable<AffiliateBillingPreferencesModel>;
    update<T>(payload: T, id: number): Observable<AffiliateBillingPreferencesModel>;
    update<T>(payload: T, id?: number): Observable<AffiliateBillingPreferencesModel> {
        return this.api
            .update(payload, id)
            .pipe(map((response) => this.jsonConvertService.mapper(AffiliateBillingPreferencesModel, response)));
    }
}
