import { BaseReportPersist } from '../../../../../../../common/src/lib/state/base-report.persist';
import { ReportInvalidClicksState } from './report-invalid-clicks.store';

export class ReportInvalidClicksPersist extends BaseReportPersist<ReportInvalidClicksState> {
    constructor(protected storeName: string, protected state: ReportInvalidClicksState) {
        super(storeName, state);
    }
}
