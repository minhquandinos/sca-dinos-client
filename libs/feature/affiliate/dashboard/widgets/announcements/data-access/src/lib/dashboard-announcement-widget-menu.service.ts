import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { RestApiService } from '@scaleo/core/rest-api/service';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

import { AnnouncementsCountInterface, AnnouncementsMenuEnum, AnnouncementsWidgetMenus } from './dashboard-annoucement-widget.model';

@Injectable()
export class DashboardAnnouncementWidgetMenuService {
    private _menus$: BehaviorSubject<AnnouncementsWidgetMenus[]> = new BehaviorSubject([
        {
            title: AnnouncementsMenuEnum.All,
            count: 0,
            countKey: 'all-count'
        },
        {
            title: AnnouncementsMenuEnum.Offers,
            count: 0,
            countKey: 'onMyOffers-count'
        }
    ]);

    readonly menus$ = this._menus$.asObservable();

    constructor(private profileQuery: ProfileQuery, private platformCountsService: PlatformCountsService, private rest: RestApiService) {}

    filterMenus() {
        if (this.profileQuery.role === DefaultRoleEnum.AdvertiserManager) {
            const menus: AnnouncementsWidgetMenus[] = this._menus$.getValue().filter((menu) => menu.title !== 'offers');
            this._menus$.next(menus);
        }
    }

    loadCountList(): Observable<AnnouncementsCountInterface> {
        return this.rest.get<AnnouncementsCountInterface>('announcements-count').pipe(
            pluck('info'),
            switchMap((response: AnnouncementsCountInterface) => {
                if (response) {
                    const menus: AnnouncementsWidgetMenus[] = this._menus$.getValue().map((menu) => {
                        const count = (response as any)?.[menu.countKey];
                        return {
                            ...menu,
                            count
                        };
                    });
                    this._menus$.next(menus);
                }
                return of(response);
            })
        );
    }

    public trackByFn(index: number, item: AnnouncementsWidgetMenus) {
        return (item as any)?.[item.title] || index;
    }
}
