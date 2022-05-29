import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { OfferGoalListDto, OfferGoalListQueryParamsDto } from './offer-goal-list.dto';

@Injectable({
    providedIn: 'root'
})
export class OfferGoalListApi {
    constructor(private readonly rest: RestApiService) {}

    index(offerId: number, queryParams: OfferGoalListQueryParamsDto): Observable<ApiResponseWithPagination<OfferGoalListDto[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            urlParameters: {
                offerId
            },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<OfferGoalListDto[]>>('offers-goals-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { goals }
                    }
                }) => ResponseUtil.pagination<OfferGoalListDto[]>(headers, goals)
            ),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    // store(offerId: number, goal: OfferGoalInterface): Observable<any> {
    //     return this.rest.post<OfferGoalInterface>('offers-goal', goal, { urlParameters: { offerId } });
    // }
    //
    // view(offerId: number, goalId: number): Observable<any> {
    //     return this.rest.get<OfferGoalInterface>('offers-goal', { urlParameters: { offerId, goalId } }).pipe(pluck('info', 'goal'));
    // }
    //
    // update(offerId: number, goalId: number, goal: OfferGoalInterface): Observable<OfferGoalInterface> {
    //     return this.rest.put<OfferGoalInterface>('offers-goal', goal, { urlParameters: { offerId, goalId } });
    // }
    //
    // destroy(offerId: number, goalId: number): Observable<any> {
    //     return this.rest.delete<void>('offers-goals-delete', { urlParameters: { offerId, goalId } });
    // }
}
