import { Component } from '@angular/core';

import { DefaultThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'scaleo-affiliate-pages',
    template: `<router-outlet></router-outlet>`
})
export class AffiliatePagesComponent {
    constructor(private readonly defaultThemeService: DefaultThemeService) {
        defaultThemeService.set();
    }
}
