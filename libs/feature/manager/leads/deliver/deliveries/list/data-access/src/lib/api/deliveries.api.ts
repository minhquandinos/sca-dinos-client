import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';

import { LeadsDeliveriesModel, LeadsDeliveriesQueryParamsDto, LeadsDeliveryViewModel } from '../models/leads-deliveries.model';

@Injectable()
export class DeliveriesApi {
    constructor(private rest: RestApiService) {}

    index(queryParams?: LeadsDeliveriesQueryParamsDto): Observable<ApiResponseWithPagination<LeadsDeliveriesModel[]>> {
        const params = RequestUtil.queryParams(queryParams);
        const options = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.get<ApiResponse<LeadsDeliveriesModel[]>>('leads-delivery-list', options).pipe(
            map((response) => {
                const deliveries = response.body.info['leads-deliver'];
                return ResponseUtil.pagination<LeadsDeliveriesModel[]>(response.headers, deliveries);
            })
        );
    }

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

    public delete(id: number): Observable<any> {
        return this.rest.delete<any>('leads-delivery-delete', { urlParameters: { id } });
    }
}
