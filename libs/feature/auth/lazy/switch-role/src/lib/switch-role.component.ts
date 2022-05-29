import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { AuthAsService } from '@scaleo/auth/as/service';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { SwitchRoleService } from '@scaleo/feature/auth/data-access/switch-role';
import { NavigateRootService } from '@scaleo/shared/components';
import { SnackBarService, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'auth-switch-role',
    template: ``,
    providers: [UnsubscribeService]
})
export class SwitchRoleComponent implements OnInit {
    constructor(
        private readonly navigateRootService: NavigateRootService,
        private readonly window: WindowRefService,
        private readonly profile: ProfileQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly credentialsService: AuthCredentialsService,
        private readonly profileQuery: ProfileQuery,
        private readonly profileService: NewProfileService,
        private readonly preloadService: PreloadService,
        private readonly router: Router,
        private toastr: ToastrBarService,
        private readonly authAsService: AuthAsService,
        private readonly snackBarService: SnackBarService,
        private readonly switchRoleService: SwitchRoleService
    ) {}

    ngOnInit(): void {
        this.switchRoleService
            .login()
            .pipe(
                tap(() => {
                    this.window.nativeWindow.location.replace(this.navigateRootService.path('dashboard'));
                }),
                catchError((error) => {
                    this.toastr.exception('response_message.login_as_exception');
                    this.router.navigate(['/login']);
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
