import { Component } from '@angular/core';

import { DefaultThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'scaleo-manager-pages',
    template: `<router-outlet></router-outlet>`
})
export class ManagerPagesComponent {
    constructor(private readonly themeConfigService: DefaultThemeService) {
        themeConfigService.set();
    }
}
