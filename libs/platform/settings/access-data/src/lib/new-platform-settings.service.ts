import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, of, zip } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { PlatformSettingsApi } from './platform-settings.api';
import { PlatformSettingsModel } from './platform-settings.models';
import { PlatformSettingsStore } from './platform-settings.store';

@Injectable({ providedIn: 'root' })
export class NewPlatformSettingsService {
    constructor(
        private api: PlatformSettingsApi,
        private store: PlatformSettingsStore,
        private jsonConvertService: JsonConvertService,
        private platformListsService: PlatformListsService
    ) {}

    getPlatformSettings(): Observable<PlatformSettingsModel> {
        return zip([this.api.get(), this.platformListsService.platformListsNew('currencies,statuses')]).pipe(
            map(([settings, lists]) => {
                const { currencies } = lists;
                const newSettings = { ...settings, currencies } as any;
                this.setPlatformLists(newSettings);
                return newSettings;
            }),
            rxjsOperatorsUtil.emptyResponseOnCatchError({})
        );
    }

    async init(): Promise<PlatformSettingsModel> {
        try {
            return await firstValueFrom(this.getPlatformSettings());
        } catch (e) {
            console.log(e);
        }

        return await firstValueFrom(of(undefined));
    }

    private setPlatformLists(settings: PlatformSettingsModel): void {
        this.store.update(this.jsonConvertService.mapper(PlatformSettingsModel, settings));
    }

    updateStoreKey<K extends keyof PlatformSettingsModel>(key: K, value: PlatformSettingsModel[K]): void {
        this.store.update({
            [key]: value
        });
    }

    updateStore(value: Partial<PlatformSettingsModel>): void {
        this.store.update({
            ...value
        });
    }
}
