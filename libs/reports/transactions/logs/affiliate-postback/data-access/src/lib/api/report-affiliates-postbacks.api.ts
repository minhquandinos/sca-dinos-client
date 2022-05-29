import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { ReportPagesEnum } from '@scaleo/reports/common';
import { BaseReportLogsApi } from '@scaleo/reports/transactions/logs/data-access';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

@Injectable()
export class ReportAffiliatesPostbacksApi extends BaseReportLogsApi {
    constructor(protected rest: RestApiService) {
        super(rest, ReportPagesEnum.AffiliatesPostbacks);
    }

    exportData(filters: Filter2Interface): Observable<any> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response',
                responseType: 'arrayBuffer'
            }
        };

        return this.rest.post('reports-affiliates-postbacks-log-export', payload, options);
    }
}
