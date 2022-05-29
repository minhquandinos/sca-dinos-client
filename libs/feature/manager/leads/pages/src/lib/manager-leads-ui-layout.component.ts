import { Component, OnDestroy, OnInit } from '@angular/core';

import { PlatformUiQuery, PlatformUiService, UI_INTERFACE } from '@scaleo/platform/state/ui';

@Component({
    selector: 'scaleo-manager-leads-ui',
    template: `<router-outlet></router-outlet>`
})
export class ManagerLeadsUiLayoutComponent implements OnInit, OnDestroy {
    constructor(private platformUiService: PlatformUiService, private platformUiQuery: PlatformUiQuery) {}

    ngOnInit(): void {
        if (this.platformUiQuery.getValue().uiInterface !== UI_INTERFACE.leads) {
            this.platformUiService.switchInterface(UI_INTERFACE.leads);
        }
    }

    ngOnDestroy() {
        this.platformUiService.switchInterface(UI_INTERFACE.default);
    }
}
