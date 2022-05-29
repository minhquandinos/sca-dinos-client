import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LeadsDeliveryViewModel } from '@scaleo/feature-manager-leads-deliver-deliveries-list-data-access';

import { LeadsDeliveriesUpsertApi } from './api/leads-deliveries-upsert.api';

@Injectable()
export class LeadsDeliveriesUpsertService {
    constructor(private api: LeadsDeliveriesUpsertApi) {}

    public view(id: number): Observable<LeadsDeliveryViewModel> {
        return this.api.view(id);
    }

    public create(campaign: LeadsDeliveryViewModel): Observable<LeadsDeliveryViewModel> {
        return this.api.create(campaign);
    }

    public update(id: number, campaign: LeadsDeliveryViewModel): Observable<LeadsDeliveryViewModel> {
        return this.api.update(id, campaign);
    }

    public delete(id: number): Observable<void> {
        return this.api.delete(id);
    }
}
