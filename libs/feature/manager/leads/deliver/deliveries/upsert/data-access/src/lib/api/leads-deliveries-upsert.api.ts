import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { LeadsDeliveriesModel, LeadsDeliveryViewModel } from '@scaleo/feature-manager-leads-deliver-deliveries-list-data-access';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

@Injectable()
export class LeadsDeliveriesUpsertApi {
    constructor(private rest: RestApiService) {}

    public view(id: number): Observable<LeadsDeliveryViewModel> {
        return this.rest.get<LeadsDeliveryViewModel>('leads-delivery-view', { urlParameters: { id } }).pipe(pluck('info', 'leads-deliver'));
    }

    public create(delivery: LeadsDeliveryViewModel): Observable<LeadsDeliveryViewModel> {
        return this.rest.post<LeadsDeliveryViewModel>('leads-delivery-create', delivery);
    }

    public update(id: number, delivery: LeadsDeliveryViewModel): Observable<LeadsDeliveryViewModel> {
        return this.rest.put<LeadsDeliveryViewModel>('leads-delivery-update', delivery, {
            urlParameters: { id }
        });
    }

    public delete(id: number): Observable<void> {
        return this.rest.delete<any>('leads-delivery-delete', { urlParameters: { id } });
    }
}
