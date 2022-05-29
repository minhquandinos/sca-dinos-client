import { BaseReportPersist } from '@scaleo/reports/common';

import { ReportConversionsState } from './report-conversions.store';

export class ReportConversionPersist extends BaseReportPersist<ReportConversionsState> {
    constructor(protected storeName: string, protected state: ReportConversionsState) {
        super(storeName, state);
    }
}
