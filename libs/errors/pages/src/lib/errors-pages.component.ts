import { Component } from '@angular/core';

import { DefaultThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'scaleo-errors-pages',
    template: `<router-outlet></router-outlet>`
})
export class ErrorsPagesComponent {
    constructor(private readonly defaultThemeService: DefaultThemeService) {
        defaultThemeService.set();
    }
}
