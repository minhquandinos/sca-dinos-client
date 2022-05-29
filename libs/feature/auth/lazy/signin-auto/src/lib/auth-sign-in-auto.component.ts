import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';

import { AuthModel, AuthTypeEnum } from '@scaleo/auth/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AuthWorkspaceService } from '@scaleo/feature/auth/data-access/signin-auto';

@Component({
    selector: 'scaleo-auth-signin-auto',
    template: `
        <div class="d-flex align-items-center justify-content-center" style="height: calc(100vh)">
            <div class="d-flex align-items-center flex-column">
                <ui-spinner></ui-spinner>
            </div>
        </div>
    `,
    providers: [UnsubscribeService]
})
export class AuthSignInAutoComponent implements OnInit {
    constructor(
        private router: Router,
        private readonly unsubscribe: UnsubscribeService,
        private readonly authWorkspaceService: AuthWorkspaceService
    ) {}

    ngOnInit(): void {
        this.autoLoginAfterInstall();
        this.loginFromControl();
    }

    private loginCatchErrorPipe(): any {
        return catchError((error) => {
            this.router.navigateByUrl('login');

            return throwError(error);
        });
    }

    private autoLogin(token: string = null, type: AuthTypeEnum = AuthTypeEnum.Base): Observable<AuthModel> {
        let login$: Observable<AuthModel>;

        switch (type) {
            case AuthTypeEnum.WorkspaceLogin:
                login$ = this.authWorkspaceService.login(token);
                break;
            default:
                login$ = EMPTY;
                break;
        }

        return login$.pipe(take(1), this.loginCatchErrorPipe());
    }

    private autoLoginAfterInstall(): void {
        this.authWorkspaceService
            .autoLoginAfterInstall()
            .pipe(
                switchMap((token) => this.autoLogin(token, AuthTypeEnum.WorkspaceLogin)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private loginFromControl(): void {
        this.authWorkspaceService
            .loginFromControl()
            .pipe(
                switchMap((token) => this.autoLogin(token, AuthTypeEnum.WorkspaceLogin)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
