import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { defer, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { PlatformThemeService } from '@scaleo/platform/theme/service';

@Component({
    selector: 'app-root',
    template: `
        <app-preload></app-preload>
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    constructor(
        private readonly _preloadService: PreloadService,
        private readonly _router: Router,
        private readonly _profileQuery: ProfileQuery,
        private readonly _auth: AuthenticationService,
        private readonly _platformThemeService: PlatformThemeService
    ) {}

    ngOnInit(): void {
        this._stopPreloading();
    }

    private _stopPreloading(): void {
        this._platformThemeService.selectedTheme$
            .pipe(
                filter((theme) => !!theme),
                switchMap(() => defer(() => (this._auth.isAuthenticated() ? this._profileQuery.roleIsNotEmpty$ : of(true)))),
                switchMap(() => this._router.events),
                filter((event) => event instanceof NavigationEnd),
                tap(() => {
                    if (!this._preloadService.loaded) {
                        this._preloadService.setLoaded(true);
                    }
                })
            )
            .subscribe();
    }
}
