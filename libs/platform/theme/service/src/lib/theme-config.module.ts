import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { THEME, ThemeOptionsType, ThemeType } from '@scaleo/platform/theme/common';

import { DefaultThemeService } from './default-theme.service';
import { THEME_CONFIG_TOKEN } from './theme-config.model';

@NgModule({
    imports: [CommonModule],
    providers: [DefaultThemeService]
})
export class ThemeConfigModule {
    static forChild(): ModuleWithProviders<ThemeConfigModule>;
    static forChild<K extends ThemeType>(theme: K, options: ThemeOptionsType[K]): ModuleWithProviders<ThemeConfigModule>;
    static forChild(theme?: any, options?: any): ModuleWithProviders<ThemeConfigModule> {
        return {
            ngModule: ThemeConfigModule,
            providers: [
                {
                    provide: THEME_CONFIG_TOKEN,
                    useValue: {
                        theme: theme ? theme : THEME.default,
                        options: options ? options : { mode: 'light' }
                    }
                }
            ]
        };
    }
}
