import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { availableThemeOptions, THEME, ThemeModeType, ThemeOptionsType, ThemeType } from '@scaleo/platform/theme/common';

import { THEME_CONFIG_TOKEN, ThemeConfigModel } from './theme-config.model';

@Injectable({
    providedIn: 'root'
})
export class PlatformThemeService {
    private _themeLinkElement: HTMLLinkElement;

    private _selected$: BehaviorSubject<ThemeType> = new BehaviorSubject<ThemeType>(null);

    readonly selectedTheme$ = this._selected$.asObservable();

    private _mode$: BehaviorSubject<ThemeModeType> = new BehaviorSubject<ThemeModeType>(null);

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Optional() @Inject(THEME_CONFIG_TOKEN) public readonly themeConfig: ThemeConfigModel
    ) {
        this.initTheme();
    }

    get selected(): ThemeType {
        return this._selected$.getValue();
    }

    get mode(): ThemeModeType {
        return this._mode$.getValue();
    }

    set<K extends ThemeType>(theme: K, options: ThemeOptionsType[K]): void {
        const isCurrentThemeSelected = this.selected === theme;
        if (!isCurrentThemeSelected && this.availableTheme(theme)) {
            const { mode } = options;
            this._themeLinkElement.href = `${theme}-${mode}.css`;

            this.document.body.classList.remove(this.selected);
            this.document.body.classList.add(theme);
            this._selected$.next(theme);
            this._mode$.next(options.mode);
        }
    }

    setMode(mode: ThemeModeType): void {
        if (this.availableThemeMode(mode)) {
            this.set(this.selected, { mode });
            this._mode$.next(mode);
        }
    }

    private initTheme(): void {
        const headElement = this.document.getElementsByTagName('head')[0];
        this._themeLinkElement = this.document.createElement('link');
        this._themeLinkElement.rel = 'stylesheet';

        headElement.appendChild(this._themeLinkElement);
    }

    private availableTheme(theme: ThemeType): boolean {
        return Object.values(THEME).includes(theme);
    }

    private availableThemeMode(mode: ThemeModeType): boolean {
        return availableThemeOptions?.[this.selected]?.mode?.includes(mode);
    }
}
