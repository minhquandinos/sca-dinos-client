import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({
    providedIn: 'root'
})
export class DefaultTimezoneService {
    timezone: string;

    private _timezones$: BehaviorSubject<BaseObjectModel[]> = new BehaviorSubject<BaseObjectModel[]>([]);

    readonly timezones$ = this._timezones$.asObservable();

    constructor(
        private readonly platformListsService: PlatformListsService,
        private readonly platformSettingsQuery: PlatformSettingsQuery
    ) {
        if (this._timezones$.value.length <= 0) {
            this.initTimezones();
        }
        this.selectedTimezone();
    }

    private selectedTimezone(): void {
        this.platformSettingsQuery.settings$
            .pipe(
                map(({ platform_time_zone }) => platform_time_zone),
                share()
            )
            .subscribe((timezone) => {
                this.timezone = timezone;
            });
    }

    initTimezones(): void {
        this.platformListsService
            .platformListsNew('timezones')
            .pipe(map((list) => list.timezones))
            .subscribe((timezones) => {
                if (timezones) {
                    timezones.map((item: any) => ({
                        ...item,
                        title: item.title.replace(' &amp;', ',')
                    }));
                    this._timezones$.next(timezones);
                }
            });
    }
}
