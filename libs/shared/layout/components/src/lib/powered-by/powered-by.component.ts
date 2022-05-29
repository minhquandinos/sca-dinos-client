import { Component, OnInit } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'shared-layout-powered-by',
    template: ` <div class="page-footer-developed-by d-flex justify-content-center">
        <span *ngIf="showPoweredByScaleo"> {{ 'POWERED_BY' | translate }} <a target="_blank" href="https://dinos.vn">Mosaic</a> </span>
    </div>`
})
export class PoweredByComponent implements OnInit {
    public showPoweredByScaleo: boolean;

    constructor(private platformSettingsQuery: PlatformSettingsQuery) {}

    ngOnInit(): void {
        this.showPoweredByScaleo = this.platformSettingsQuery.settings?.show_powered_by;
    }
}
