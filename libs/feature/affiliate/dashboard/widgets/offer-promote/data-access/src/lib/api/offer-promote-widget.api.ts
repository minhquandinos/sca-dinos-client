import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferPromoteWidgetResponseModel } from '../models/offer-promote-widget.model';

@Injectable()
export class OfferPromoteWidgetApi {
    constructor(private rest: RestApiService) {}

    get(filters: BaseObjectModel): Observable<OfferPromoteWidgetResponseModel> {
        const params = RequestUtil.queryParams(filters.params);

        return this.rest
            .get<ApiResponse<OfferPromoteWidgetResponseModel>>('dashboard-promote-offer', {
                request: { params }
            })
            .pipe(pluck('info'));
    }
}
