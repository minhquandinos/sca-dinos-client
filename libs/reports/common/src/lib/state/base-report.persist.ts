import { AbstractPersistState } from '@scaleo/core/state/persist-state';

import { ReportUtil } from '../util/report.util';
import { BaseReportState } from './base-report-state.model';

export class BaseReportPersist<T extends BaseReportState> extends AbstractPersistState {
    constructor(protected storeName: string, protected state: T) {
        super();
    }

    storageState(): any {
        return {
            columns: this.state.data.columns,
            selectedFilters: ReportUtil.getSavedSelectedFilters(this.state.data.selectedFilters)
        };
    }

    restoreState(initialState: any, savedRoleState?: any): any {
        return {
            data: {
                ...initialState.data,
                columns: savedRoleState?.[this.storeName]?.columns || initialState.data.columns,
                selectedFilters: savedRoleState?.[this.storeName]?.selectedFilters || initialState.data.selectedFilters
            }
        };
    }
}
