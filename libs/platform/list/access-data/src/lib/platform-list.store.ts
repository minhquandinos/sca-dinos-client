import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { PlatformListModel } from './models/platform-list.model';

export type PlatformListState = PlatformListModel;

const initialState = (): PlatformListModel => {
    const listModel = new PlatformListModel();

    const property: any = {};

    Object.getOwnPropertyNames(listModel).forEach((prop: any) => {
        if (!/^_/.test(prop)) {
            property[prop] = undefined;
        }
    });

    return property;
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'platform-list', idKey: 'idKey', resettable: true })
export class PlatformListStore extends Store<PlatformListState> {
    constructor() {
        super(initialState());
    }
}
