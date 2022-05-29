import { Inject, Injectable, Optional } from '@angular/core';

import { AbstractAsyncStorage, ASYNC_STORAGE_KEY_TOKEN } from '@scaleo/core/storage/common';

import { LocalSyncStorageService } from './local-sync-storage.service';

@Injectable({
    providedIn: 'root'
})
export class LocalAsyncStorageService extends AbstractAsyncStorage {
    constructor(
        private readonly localSyncStorage: LocalSyncStorageService,
        @Optional() @Inject(ASYNC_STORAGE_KEY_TOKEN) protected readonly storageKey: string
    ) {
        super(localSyncStorage, storageKey);
    }
}
