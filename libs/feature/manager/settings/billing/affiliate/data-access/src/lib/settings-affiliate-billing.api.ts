import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateBillingModel } from './models/affiliate-billing.model';

@Injectable()
export class SettingsAffiliateBillingApi {
    constructor(private rest: RestApiService) {}

    public view(): Observable<AffiliateBillingModel> {
        return this.rest.get<AffiliateBillingModel>('affiliate-billing-view').pipe(pluck('info', 'settings'));
    }

    public update(post: AffiliateBillingModel): Observable<AffiliateBillingModel> {
        return this.rest.put<AffiliateBillingModel>('affiliate-billing-update', post);
    }
}
