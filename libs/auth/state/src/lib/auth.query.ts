import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { AuthState, AuthStore } from './auth.store';

@Injectable({
    providedIn: 'root'
})
export class AuthQuery extends BaseStateQuery<AuthState> {
    constructor(protected store: AuthStore) {
        super(store);
    }
}
