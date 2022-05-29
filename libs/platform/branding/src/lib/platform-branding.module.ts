import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { combineQueries } from '@datorama/akita';
import { distinctUntilChanged, filter, pluck, switchMap } from 'rxjs/operators';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { BrandingService } from './branding.service';

@NgModule({
    imports: [CommonModule]
})
export class PlatformBrandingModule {
    constructor(
        @Optional() @SkipSelf() private scaleoBrandingModule: PlatformBrandingModule,
        private brandingService: BrandingService,
        private platformSettingsQuery: PlatformSettingsQuery
    ) {
        if (scaleoBrandingModule) {
            throw new Error('ScaleoBrandingModule has already been loaded. Import this module in the AppModule only.');
        }

        this.platformSettingsQuery.settings$
            .pipe(
                filter((settings) => !!settings),
                switchMap(() =>
                    combineQueries([
                        this.platformSettingsQuery.settings$.pipe(pluck('network_name')),
                        this.platformSettingsQuery.settings$.pipe(pluck('logo')),
                        this.platformSettingsQuery.settings$.pipe(pluck('favicon')),
                        this.platformSettingsQuery.settings$.pipe(pluck('main_color')),
                        this.platformSettingsQuery.settings$.pipe(pluck('links_color')),
                        this.platformSettingsQuery.settings$.pipe(pluck('client_custom_code'))
                    ])
                ),
                filter(([, , , main_color, links_color]) => !!main_color && !!links_color),
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
            )
            .subscribe(([network_name, logo, favicon, main_color, links_color, client_custom_code]) => {
                this.brandingService.init({
                    network_name,
                    logo,
                    favicon,
                    main_color,
                    links_color,
                    client_custom_code
                });
            });
    }
}
