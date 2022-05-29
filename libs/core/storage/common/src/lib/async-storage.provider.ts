import { InjectionToken, Provider } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';

import { STORAGE_KEY } from './abstract-async-storage';

export const ASYNC_STORAGE_KEY_TOKEN = new InjectionToken<string>('AsyncStorageKeyToken');

export const ASYNC_STORAGE_PROVIDER: Provider = {
    provide: ASYNC_STORAGE_KEY_TOKEN,
    useFactory: (profileQuery: ProfileQuery) => {
        return `${STORAGE_KEY}_${profileQuery?.profile?.role || 'undefined'}`.toUpperCase();
    },
    deps: [ProfileQuery]
};
