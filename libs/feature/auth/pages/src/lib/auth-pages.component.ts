import { Component } from '@angular/core';

import { DefaultThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'scaleo-auth-pages',
    template: `<router-outlet></router-outlet>`
})
export class AuthPagesComponent {
    constructor(private readonly themeConfigService: DefaultThemeService) {
        themeConfigService.set();
    }
}
