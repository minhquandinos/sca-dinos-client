import { BaseReportPersist } from '../../../../../../../common/src/lib/state/base-report.persist';
import { ReportAdvertiserPostbacksState } from './report-advertiser-postbacks.store';

export class ReportAdvertiserPostbacksPersist extends BaseReportPersist<ReportAdvertiserPostbacksState> {
    constructor(protected storeName: string, protected state: ReportAdvertiserPostbacksState) {
        super(storeName, state);
    }
}
