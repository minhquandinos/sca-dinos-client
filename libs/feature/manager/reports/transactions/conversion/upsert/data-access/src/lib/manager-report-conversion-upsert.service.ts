import { Injectable } from '@angular/core';

import { ManagerReportConversionUpsertApi } from './manager-report-conversion-upsert.api';
import { ConversionViewModel, ManagerReportConversionUpsertModel } from './manager-report-conversion-upsert.model';

@Injectable()
export class ManagerReportConversionUpsertService {
    constructor(private readonly api: ManagerReportConversionUpsertApi) {}

    update(payload: ManagerReportConversionUpsertModel): Promise<ManagerReportConversionUpsertModel> {
        return this.api.update(payload).toPromise();
    }

    view(id: string): Promise<ConversionViewModel> {
        return this.api.view(id).toPromise();
    }
}
