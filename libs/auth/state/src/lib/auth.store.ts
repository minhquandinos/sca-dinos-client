import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

export interface AuthState {
    accessToken: string;
    role: DefaultRoleEnum;
}

const initialState = createBaseInitialState<AuthState>({
    accessToken: undefined,
    role: undefined
});

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'credentials', resettable: true })
export class AuthStore extends BaseStateStore<AuthState> {
    constructor() {
        super(initialState);
    }
}
