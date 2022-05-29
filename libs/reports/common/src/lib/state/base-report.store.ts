import { StoreConfigOptions } from '@datorama/akita';

import { BaseEntityInitialState, BaseEntityStore } from '@scaleo/core/state/entiy-state';

import { BaseReportState } from './base-report-state.model';

export class BaseReportStore<T extends BaseReportState> extends BaseEntityStore<T> {
    constructor(protected initialState: BaseEntityInitialState<T>, options?: Partial<StoreConfigOptions>) {
        super(initialState, options);
    }
}
