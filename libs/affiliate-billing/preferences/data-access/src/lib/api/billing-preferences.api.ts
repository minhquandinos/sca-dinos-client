import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';

@Injectable({
    providedIn: 'root'
})
export class BillingPreferencesApi {
    constructor(private rest: RestApiService) {}

    show<T>(): Observable<T>;
    show<T>(id: number): Observable<T>;
    show<T>(id?: number): Observable<T> {
        const options: RestApiOptions = {
            urlParameters: {
                id
            }
        };

        return this.rest.get<ApiResponse<T>>('affiliate-billing-detail', options).pipe(pluck('info', 'affiliate-billing-details'));
    }

    update<T>(body: T): Observable<T>;
    update<T>(body: T, id: number): Observable<T>;
    update<T = any>(body: T, id?: number): Observable<T> {
        const options: RestApiOptions = {
            urlParameters: {
                id
            }
        };

        return this.rest.put<ApiResponse<T>>('affiliate-billing-detail', body, options).pipe(pluck('info', 'affiliate-billing-details'));
    }
}
