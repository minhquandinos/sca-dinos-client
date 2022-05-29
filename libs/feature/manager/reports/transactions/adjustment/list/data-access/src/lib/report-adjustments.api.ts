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
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { AdjustmentListDto, AdjustmentListModel, AdjustmentLIstQueryParamsModel } from './adjustments.interface';

@Injectable()
export class ReportAdjustmentsApi {
    constructor(private rest: RestApiService, private jsonConvertService: JsonConvertService) {}

    index(queryParams?: AdjustmentLIstQueryParamsModel): Observable<ApiResponseWithPagination<AdjustmentListModel>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<AdjustmentListDto>>('reports-adjustments', options).pipe(
            map(({ headers, body }) => {
                // const adjusts = response.body.info.adjustments.map((adjust: AdjustmentsInterface) => {
                //     const conditions = adjust.conditions ? this.convertConditionsForList(adjust.conditions) : [];
                //     const details = adjust.details ? this.convertDetails(JSON.parse(adjust.details)) : [];
                //     return {
                //         ...adjust,
                //         conditions,
                //         details,
                //         parameters: details
                //     };
                // });
                const mapper = this.jsonConvertService.mapper(AdjustmentListModel, body?.info?.adjustments || []);
                return ResponseUtil.pagination(headers, mapper);
            })
        );
    }

    // convertDetails(detail): any {
    //     const details = [];
    //     Object.keys(detail).forEach((key) => {
    //         const value = detail[key];
    //         const obj = {
    //             key,
    //             value
    //         };
    //         details.push(obj);
    //     });
    //     return details;
    // }
    //
    // convertConditionsForList(conditions): any[] {
    //     const conds: any[] = Util.jsonParse(conditions, []);
    //     const haveGoal = conds.filter((item) => Object.keys(item)[2] === 'goal');
    //
    //     if (haveGoal.length > 0) {
    //         const indexOffer = conds.findIndex((item) => Object.keys(item)[1] === 'offer');
    //         const goal = {
    //             key: 'goal',
    //             value: haveGoal[0]['goal']
    //         };
    //
    //         conds.splice(indexOffer + 1, 0, goal);
    //     }
    //     return conds.map((item) => ({
    //         ...item,
    //         value: item[Object.keys(item)[1]]
    //     }));
    // }
}
