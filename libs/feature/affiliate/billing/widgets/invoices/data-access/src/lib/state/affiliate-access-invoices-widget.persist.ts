import { AbstractPersistState } from '../../../../../../../../../core/state/persist-state/src/lib/abstract-persist-state';
import { AffiliateAccessInvoicesState } from './affiliate-access-invoices-widget.store';

export class AffiliateAccessInvoicesWidgetPersist extends AbstractPersistState {
    constructor(protected storeName: string, protected state: AffiliateAccessInvoicesState) {
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
