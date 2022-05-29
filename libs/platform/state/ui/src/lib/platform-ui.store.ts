import { Injectable } from '@angular/core';
import { persistState, StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';
import { UiInterfaceType } from '@scaleo/platform/state/ui';
import { ThemeModeType } from '@scaleo/platform/theme/common';

export interface PlatformUiState {
    collapseMenu: boolean;
    displayMobileMenu: boolean;
    themeMode: ThemeModeType;
    uiInterface: UiInterfaceType;
}

const initialState = createBaseInitialState<PlatformUiState>({
    collapseMenu: false,
    displayMobileMenu: false,
    themeMode: 'light',
    uiInterface: 'default'
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'platform-ui', resettable: true })
export class PlatformUiStore extends BaseStateStore<PlatformUiState> {
    constructor() {
        super(initialState);
    }
}

export const usersPersistStorage = persistState({
    include: ['platform-ui'],
    key: 'scaleo__platformUiStore'
});
