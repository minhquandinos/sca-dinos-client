import { Component } from '@angular/core';

import { DefaultThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'scaleo-advertiser-access-pages',
    template: `<router-outlet></router-outlet>`
})
export class AdvertiserAccessPagesComponent {
    constructor(private readonly defaultThemeService: DefaultThemeService) {
        defaultThemeService.set();
    }
}
