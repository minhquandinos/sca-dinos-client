import { AbstractPersistState } from '../../../../../../../../core/state/persist-state/src/lib/abstract-persist-state';
import { LeadsLogsState } from './leads-logs.store';

export class LeadsLogsPersist extends AbstractPersistState {
    constructor(protected storeName: string, protected state: LeadsLogsState) {
        super();
    }

    storageState(): any {
        return {
            columns: this.state.data.columns
        };
    }

    restoreState(initialState: any, savedRoleState?: any): any {
        return {
            data: {
                ...initialState.data,
                columns: savedRoleState?.[this.storeName]?.columns || initialState.data.columns
            }
        };
    }
}
