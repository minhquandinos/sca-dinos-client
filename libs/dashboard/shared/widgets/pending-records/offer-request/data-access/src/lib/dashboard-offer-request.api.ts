import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { DashboardOfferRequestDto, DashboardOfferRequestModel } from './dashboard-offer-request.model';

@Injectable()
export class DashboardOfferRequestApi {
    constructor(private readonly rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    index(): Observable<DashboardOfferRequestModel[]> {
        return this.rest.get<ApiResponse<DashboardOfferRequestDto[]>>('dashboard-offers-requests').pipe(
            pluck('info', 'pending-requests'),
            map((response) => {
                return this.jsonConvertService.mapper(DashboardOfferRequestModel, response);
            })
        );
    }
}
