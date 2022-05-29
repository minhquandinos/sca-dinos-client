import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { LeadsReceiveCampaignList } from '../models/leads-receive-campaign-list.model';
import { LeadsReceiveCampaignListQueryParamsModel } from '../state/receive-leads-campaign-list.store';

@Injectable()
export class ReceiveLeadsCampaignsApi {
    constructor(private rest: RestApiService, private jsonConvertService: JsonConvertService) {}

    index(queryParams?: LeadsReceiveCampaignListQueryParamsModel): Observable<ApiResponseWithPagination<LeadsReceiveCampaignList[]>> {
        const params = RequestUtil.queryParams(queryParams);
        const options = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.get<ApiResponse<LeadsReceiveCampaignList[]>>('leads-receive-campaigns-list', options).pipe(
            map((response) => {
                const data = response.body.info['leads-receive'];
                const campaigns = this.jsonConvertService.mapper<LeadsReceiveCampaignList>(LeadsReceiveCampaignList, data);
                return ResponseUtil.pagination<LeadsReceiveCampaignList[]>(response.headers, campaigns);
            })
        );
    }
}
