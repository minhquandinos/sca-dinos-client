import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { AuthLogoutService } from '@scaleo/auth/logout/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-exception-page',
    templateUrl: './connection-lost.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class ConnectionLostComponent implements OnInit {
    @HostBinding('class') hostClass = 'connection-lost';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private newPlatformSettingsService: NewPlatformSettingsService,
        private unsubscribe: UnsubscribeService,
        private authenticationService: AuthenticationService,
        private authLogoutService: AuthLogoutService,
        private router: Router,
        private preloadService: PreloadService
    ) {}

    ngOnInit(): void {
        this.preloadService.setLoaded(true);
        this.detectPlatformWork();
    }

    refresh(): void {
        this.newPlatformSettingsService
            .getPlatformSettings()
            .pipe(
                tap(() => {
                    this.urlNavigate();
                }),
                take(1)
            )
            .subscribe();
    }

    private urlNavigate(): void {
        const url = new URL(this.document.location.href);
        const returnUrl = url.searchParams.get('returnUrl');

        if (this.authenticationService.isAuthenticated()) {
            this.router.navigate([returnUrl || '']);
        }

        if (!this.authenticationService.isAuthenticated()) {
            this.authLogoutService.redirect(returnUrl);
        }
    }

    private detectPlatformWork(): void {
        interval(1000 * 60)
            .pipe(
                switchMap(() => this.newPlatformSettingsService.getPlatformSettings()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((settings) => {
                if (settings) {
                    this.urlNavigate();
                }
            });
    }
}
