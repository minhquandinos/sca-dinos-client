import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseStateService } from '@scaleo/core/state/state';
import { WindowRefService } from '@scaleo/core/window-ref/service';

import { UI_INTERFACE, UiInterfaceType } from './platform-ui.model';
import { PlatformUiQuery } from './platform-ui.query';
import { PlatformUiState, PlatformUiStore } from './platform-ui.store';

@Injectable({ providedIn: 'root' })
export class PlatformUiService extends BaseStateService<PlatformUiState> {
    constructor(
        protected override store: PlatformUiStore,
        protected override query: PlatformUiQuery,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly windowRefService: WindowRefService
    ) {
        super(store, query);

        const path = windowRefService.nativeWindow.location.href;
        if (path) {
            const isLeadsPath = /leads/g.test(path);
            if (!isLeadsPath && this.query.getValue().uiInterface === UI_INTERFACE.leads) {
                console.log(!isLeadsPath && this.query.getValue().uiInterface === UI_INTERFACE.leads);
                this.switchInterface(UI_INTERFACE.default);
            }
        }
    }

    switchInterface(uiInterface: UiInterfaceType) {
        this.store.update({ uiInterface });
    }
}
