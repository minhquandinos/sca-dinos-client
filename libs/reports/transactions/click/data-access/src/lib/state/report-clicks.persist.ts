import { BaseReportPersist } from '@scaleo/reports/common';

import { ReportClicksState } from './report-clicks.store';

export class ReportClicksPersist extends BaseReportPersist<ReportClicksState> {
    constructor(protected storeName: string, protected state: ReportClicksState) {
        super(storeName, state);
    }
}
