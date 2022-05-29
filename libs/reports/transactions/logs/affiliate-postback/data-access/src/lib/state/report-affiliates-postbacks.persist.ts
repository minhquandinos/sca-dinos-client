import { BaseReportPersist } from '../../../../../../../common/src/lib/state/base-report.persist';
import { ReportAffiliatesPostbacksState } from './report-affiliates-postbacks.store';

export class ReportAffiliatesPostbacksPersist extends BaseReportPersist<ReportAffiliatesPostbacksState> {
    constructor(protected storeName: string, protected state: ReportAffiliatesPostbacksState) {
        super(storeName, state);
    }
}
