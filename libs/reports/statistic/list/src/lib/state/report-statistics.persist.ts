import { BaseReportPersist } from '@scaleo/reports/common';

import { NewReportStatisticsState } from './new-report-statistics.store';

export class ReportStatisticsPersist extends BaseReportPersist<NewReportStatisticsState> {
    constructor(protected storeName: string, protected state: NewReportStatisticsState) {
        super(storeName, state);
    }

    storageState(): any {
        return {
            ...super.storageState(),
            currency: this.state.data.currency
        };
    }

    restoreState(initialState: any, savedRoleState?: any): any {
        return {
            data: {
                ...super.restoreState(initialState, savedRoleState).data,
                currency: savedRoleState?.[this.storeName]?.currency || initialState.data.currency
            }
        };
    }
}
