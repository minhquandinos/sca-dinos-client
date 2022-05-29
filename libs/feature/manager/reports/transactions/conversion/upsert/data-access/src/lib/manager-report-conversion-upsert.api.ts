import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { ConversionEditDto, ConversionViewDto } from './manager-report-conversion-upsert.model';

@Injectable()
export class ManagerReportConversionUpsertApi {
    constructor(protected rest: RestApiService) {}

    update(payload: ConversionEditDto): Observable<ConversionEditDto> {
        return this.rest.put<ConversionEditDto>('report-conversions-update-lead', payload);
    }

    view(id: string): Observable<ConversionViewDto> {
        const payload = {
            lead_id: id
        };
        return this.rest.post<ApiResponse<ConversionViewDto>>('report-conversions-view-lead', payload).pipe(pluck('info', 'lead'));
    }
}
