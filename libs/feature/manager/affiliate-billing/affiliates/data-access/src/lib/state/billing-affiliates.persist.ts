import { Injectable } from '@angular/core';

import { AbstractPersistState } from '../../../../../../../../core/state/persist-state/src/lib/abstract-persist-state';
import { BillingAffiliatesState } from './billing-affiliates.store';

@Injectable()
export class BillingAffiliatesPersist extends AbstractPersistState {
    constructor(protected readonly storeName: string, protected readonly state: BillingAffiliatesState) {
        super();
    }

    storageState(): any {
        const { columns } = this.state.params;
        return {
            columns
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
