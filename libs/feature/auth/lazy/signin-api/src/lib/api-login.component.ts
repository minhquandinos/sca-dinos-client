import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AuthRemoteService } from '@scaleo/feature/auth/data-access/signin-api';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Component({
    selector: 'app-api-login',
    template: `
        <div class="d-flex align-items-center justify-content-center" style="height: calc(100vh)">
            <div class="d-flex align-items-center flex-column">
                <ui-spinner></ui-spinner>
            </div>
        </div>
    `,
    providers: [UnsubscribeService]
})
export class ApiLoginComponent implements OnInit {
    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _authRemoteService: AuthRemoteService,
        private readonly _toastr: ToastrBarService,
        private readonly _unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._apiLogin();
    }

    private _apiLogin(): void {
        this._route.queryParams
            .pipe(
                switchMap((params) => {
                    if (params.temporary_token && this._router.navigated) {
                        const tempToken = decodeURI(params.temporary_token);
                        return this._authRemoteService.getRealTokenByTempToken(tempToken);
                    }
                    return EMPTY;
                }),
                filter((token) => !!token),
                switchMap((token) => this._authRemoteService.login(token)),
                rxjsOperatorsUtil.retryWithDelay(1000, 5),
                rxjsOperatorsUtil.resolveError(),
                takeUntil(this._unsubscribe)
            )
            .subscribe({
                next: (user) => {
                    if (user) {
                        this._router.navigate(['/']);
                    } else {
                        this._authRemoteService.redirectLoginPage();
                    }
                },
                error: (error: Error) => {
                    this._toastr.displayValidationMessages(error.message);
                    setTimeout(() => {
                        this._authRemoteService.redirectLoginPage();
                    }, 3000);
                }
            });
    }
}
