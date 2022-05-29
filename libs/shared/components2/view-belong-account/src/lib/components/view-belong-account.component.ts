import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { NavigateRootService } from '@scaleo/shared/components';
import { SnackBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-view-belong-account',
    template: `
        <div class="d-flex align-items-center">
            <span>{{ 'auth.logged_as' | translate }} {{ roleLabel | titlecase }}.</span>
            <ui-button-link
                class="ml-3"
                [label]="'auth.back_to_you_account' | translate"
                icon="ic_arrow_angle45"
                iconPosition="right"
                (toggle)="back()"
                [disabled]="disabled$ | async"
            ></ui-button-link>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBelongAccountComponent {
    readonly roleLabel = this.profileQuery.roleLabel;

    private _disabled$ = new BehaviorSubject(false);

    readonly disabled$ = this._disabled$.asObservable();

    constructor(
        private readonly profileService: NewProfileService,
        private readonly credentialsService: AuthCredentialsService,
        private readonly router: Router,
        private readonly profileQuery: ProfileQuery,
        private readonly snackBarService: SnackBarService,
        private readonly preloadService: PreloadService,
        private readonly window: WindowRefService,
        private readonly navigateRootService: NavigateRootService
    ) {}

    back(): void {
        this.preloadService.setLoaded(false);
        this.snackBarService.closeAll();
        this._disabled$.next(true);
        this.credentialsService.switchToParent();
        this.profileService.reset();

        firstValueFrom(this.profileService.get())
            .then(() => {
                this.window.nativeWindow.location.replace(this.navigateRootService.path('dashboard'));
            })
            .catch(() => {
                this.router.navigate(['/login']);
            });
    }
}
