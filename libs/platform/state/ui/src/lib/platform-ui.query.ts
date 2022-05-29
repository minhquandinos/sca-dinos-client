import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { PlatformUiState, PlatformUiStore } from './platform-ui.store';

@Injectable({ providedIn: 'root' })
export class PlatformUiQuery extends BaseStateQuery<PlatformUiState> {
    constructor(protected override store: PlatformUiStore) {
        super(store);
    }
}
