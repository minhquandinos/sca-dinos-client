import { Injectable } from '@angular/core';

import { AbstractSyncStorage, storageAvailable } from '@scaleo/core/storage/common';
import { MemoryStorageService } from '@scaleo/core/storage/memory';

@Injectable({
    providedIn: 'root'
})
export class LocalSyncStorageService extends AbstractSyncStorage {
    constructor() {
        super(storageAvailable('localStorage') ? window.localStorage : new MemoryStorageService());
    }
}
