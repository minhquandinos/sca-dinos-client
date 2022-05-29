export const THEME = {
    default: 'default-theme',
    simpleClear: 'simple-clear-theme'
} as const;

export type ThemeType = typeof THEME[keyof typeof THEME];

export type ThemeModeType = 'light' | 'dark';

export interface ThemeOptionsType {
    [THEME.default]: {
        mode: 'light';
    };
    [THEME.simpleClear]: {
        mode: ThemeModeType;
    };
}

export const availableThemeOptions = {
    [THEME.default]: {
        mode: ['light']
    },
    [THEME.simpleClear]: {
        mode: ['light', 'dark']
    }
};
