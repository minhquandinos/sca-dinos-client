import { InjectionToken } from '@angular/core';

import { ThemeModeType, ThemeType } from '@scaleo/platform/theme/common';

export interface ThemeConfigModel {
    theme: ThemeType;
    options: {
        mode: ThemeModeType;
    };
}

export const THEME_CONFIG_TOKEN = new InjectionToken<ThemeConfigModel>('Theme');
