import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { BaseObjectModel } from '@scaleo/core/data';

import { PlatformSettingsModel } from './platform-settings.models';

export type PlatformSettingsState = PlatformSettingsModel;

const initialState = (): PlatformSettingsModel => {
    const settings = new PlatformSettingsModel();

    const property: BaseObjectModel = {};

    Object.getOwnPropertyNames(settings).forEach((prop) => {
        if (!/^_/.test(prop)) {
            property[prop] = undefined;
        }
    });

    return property as any;
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'platform-settings' })
export class PlatformSettingsStore extends Store<PlatformSettingsState> {
    constructor() {
        super(initialState());
    }
}
