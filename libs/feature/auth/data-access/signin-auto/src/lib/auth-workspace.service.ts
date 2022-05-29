import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AuthModel, BaseAuthServiceInterface } from '@scaleo/auth/data';
import { AuthEventService } from '@scaleo/auth/event/service';

import { AuthWorkspaceApi } from './auth-workspace.api';

@Injectable({ providedIn: 'root' })
export class AuthWorkspaceService implements BaseAuthServiceInterface {
    constructor(
        private readonly api: AuthWorkspaceApi,
        private route: ActivatedRoute,
        private router: Router,
        private readonly authEventService: AuthEventService
    ) {}

    login(token: string): Observable<AuthModel> {
        return this.api.loginBy({ auth_token: token }).pipe(this.authEventService.event());
    }

    loginFromControl(): Observable<string> {
        return this.route.queryParams.pipe(
            filter((params) => !!params?.workspace && this.router.navigated),
            map(({ workspace }) => decodeURI(workspace)),
            switchMap((workspace) => this.controlTokenAuth(workspace)),
            filter((token) => !!token)
        );
    }

    autoLoginAfterInstall() {
        return this.route.queryParams.pipe(
            filter((params) => !!params?.token && this.router.navigated),
            map(({ token }) => decodeURI(token)),
            filter((token) => !!token)
        );
    }

    private controlTokenAuth(workspace: string): Observable<string> {
        return this.api.oneTimeControlToken(workspace);
    }
}
