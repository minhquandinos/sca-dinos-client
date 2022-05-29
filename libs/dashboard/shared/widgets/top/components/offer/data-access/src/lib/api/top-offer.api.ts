import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { TopOfferRequestType, WidgetTopOfferRowsModel } from '../models/top-offer-widget.model';

@Injectable()
export class TopOfferApi {
    constructor(private rest: RestApiService) {}

    index(requests: TopOfferRequestType): Observable<WidgetTopOfferRowsModel[]> {
        const { payload, params } = requests;
        const queryParams = RequestUtil.queryParams(params);

        return this.rest
            .post<ApiResponse<WidgetTopOfferRowsModel[]>>('dashboard-statistics-top-offers', payload, {
                request: { params: queryParams }
            })
            .pipe(
                map(({ info: { rows = [] } = {} }) => rows),
                rxjsOperatorsUtil.emptyResponseOnCatchError([])
            );
    }
}
