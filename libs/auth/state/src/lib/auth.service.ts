import { Injectable } from '@angular/core';

import { BaseStateService } from '@scaleo/core/state/state';

import { AuthQuery } from './auth.query';
import { AuthState, AuthStore } from './auth.store';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseStateService<AuthState> {
    constructor(protected store: AuthStore, protected query: AuthQuery) {
        super(store, query);
    }
}
