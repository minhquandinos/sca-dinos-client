import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';

import { DashboardAnnouncementWidgetListApi } from './api/dashboard-announcement-widget-list.api';
import { AnnouncementsMenuEnum, AnnouncementsType } from './dashboard-annoucement-widget.model';
import {
    AffiliateDashboardAnnouncementsListQueryParamsModel,
    AffiliateDashboardAnnouncementWidgetListModel,
    AnnouncementsListOnMyOffersType
} from './dashboard-announcement-widget-list.model';

@Injectable()
export class DashboardAnnouncementWidgetListService {
    private _filters$: BehaviorSubject<AffiliateDashboardAnnouncementsListQueryParamsModel> =
        new BehaviorSubject<AffiliateDashboardAnnouncementsListQueryParamsModel>({
            sortField: 'id',
            sortDirection: 'desc',
            page: 1,
            perPage: 10,
            status: 'active',
            onMyOffers: 'on',
            search: ''
        });

    readonly filters$ = this._filters$.asObservable();

    constructor(private api: DashboardAnnouncementWidgetListApi) {}

    index(): Observable<ApiResponseWithPagination<AffiliateDashboardAnnouncementWidgetListModel>> {
        return this.filters$.pipe(switchMap((queryParams) => this.api.index(queryParams)));
    }

    changeType(type: AnnouncementsType): void {
        const searchByOffer: AnnouncementsListOnMyOffersType = this.checkSearchByOffers(type);
        this._filters$.next({
            ...this._filters$.value,
            onMyOffers: searchByOffer
        });
    }

    changePage(page: number): void {
        this._filters$.next({
            ...this._filters$.value,
            page
        });
    }

    changePerPage(perPage: number): void {
        this._filters$.next({
            ...this._filters$.value,
            perPage
        });
    }

    searching(search: string): void {
        this._filters$.next({
            ...this._filters$.value,
            search
        });
    }

    get filters(): AffiliateDashboardAnnouncementsListQueryParamsModel {
        return this._filters$.value;
    }

    private checkSearchByOffers(type: AnnouncementsType): AnnouncementsListOnMyOffersType {
        return type === AnnouncementsMenuEnum.All ? 'on' : 'yes';
    }
}
