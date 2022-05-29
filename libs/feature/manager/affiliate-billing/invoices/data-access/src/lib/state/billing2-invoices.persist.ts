import { AbstractPersistState } from '../../../../../../../../core/state/persist-state/src/lib/abstract-persist-state';
import { Billing2InvoicesState } from './billing2-invoices.store';

export class Billing2InvoicesPersist extends AbstractPersistState {
    constructor(protected storeName: string, protected state: Billing2InvoicesState) {
        super();
    }

    storageState(): any {
        return {
            columns: this.state.params.columns
        };
    }

    restoreState(initialState: any, savedRoleState?: any): any {
        return {
            params: {
                ...initialState.params,
                columns: savedRoleState?.[this.storeName]?.columns || initialState.params.columns
            }
        };
    }
}
