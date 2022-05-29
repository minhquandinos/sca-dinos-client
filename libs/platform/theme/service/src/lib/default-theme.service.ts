import { Inject, Injectable, Optional } from '@angular/core';

import { PlatformThemeService } from './theme.service';
import { THEME_CONFIG_TOKEN, ThemeConfigModel } from './theme-config.model';

@Injectable({
    providedIn: 'root'
})
export class DefaultThemeService {
    constructor(
        private readonly theme: PlatformThemeService,
        @Optional() @Inject(THEME_CONFIG_TOKEN) public readonly themeConfig: ThemeConfigModel
    ) {}

    set(): void {
        const { theme = undefined, options = undefined } = this.themeConfig || {};
        if (this.themeConfig) {
            this.theme.set(theme, options);
        } else {
            throw new Error('Please import ThemeConfigModule.forChild()');
        }
    }
}
