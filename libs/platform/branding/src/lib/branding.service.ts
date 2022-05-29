import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { BrandingModel } from './branding.model';
import { BrandingColor } from './branding-color';
import { BrandingFavicon } from './branding-favicon';
import { BrandingLogo } from './branding-logo';

@Injectable({
    providedIn: 'root'
})
export class BrandingService {
    public title = 'Platform';

    private _logoStyle$: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject<{ [key: string]: string }>(null);

    readonly logoStyle$ = this._logoStyle$.asObservable();

    constructor(
        private platformSettingsQuery: PlatformSettingsQuery,
        private titleService: Title,
        @Inject(DOCUMENT) private document: Document
    ) {}

    init(value: BrandingModel): void {
        this.setTitle(value.network_name);
        this.setLogo(value.logo);
        this.setFavicon(value.favicon);
        this.setColor(value.main_color, value.links_color);
        this.setClientCustomCode(value.client_custom_code);
    }

    private setTitle(newTitle: string = this.title): void {
        this.titleService.setTitle(newTitle);
    }

    private setFavicon(icon: string): void {
        const path = icon ? this.image(icon) : null;
        const favicon = new BrandingFavicon(this.document, path);
        favicon.set();
    }

    setLogo(logo?: string): void {
        const brandingLogo = new BrandingLogo(this.document);
        if (logo) {
            const path = this.image(logo);
            this._logoStyle$.next(brandingLogo.setLogo(path));
        }

        if (!logo) {
            brandingLogo.defaultLogo();
            this._logoStyle$.next(null);
        }
    }

    private setClientCustomCode(code: string): void {
        if (code !== '') {
            const fragment = this.document.createRange().createContextualFragment(code);
            this.document.querySelector('body').appendChild(fragment);
        }
    }

    private setColor(mainColor: string, linkColor: string): void {
        const color = new BrandingColor(this.document);
        color.setMainColor(mainColor);
        color.setLinksColor(linkColor);
    }

    private image(image: string): string {
        const { bucket_url, bucket_path_platform } = this.platformSettingsQuery.settings;
        return `${bucket_url}${bucket_path_platform}${image}`;
    }
}
