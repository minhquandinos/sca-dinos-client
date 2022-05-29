import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, map, pluck, scan, shareReplay, switchMap, tap } from 'rxjs/operators';

import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import {
    ShortEntityListService,
    ShortEntityNameEnum,
    ShortOfferLandingPageModel,
    ShortOfferLandingParamsModel
} from '@scaleo/shared/data-access/short-entity-list';
import { ArrayUtil } from '@scaleo/utils';

@Injectable()
export class AbTestingLandingsService {
    private _landingsPageCount: number;

    private _landingsSavedLastPage = 1;

    private _currentPage: number;

    private _landingsParams$ = new BehaviorSubject<ShortOfferLandingParamsModel>({
        page: this._landingsSavedLastPage,
        search: ''
    });

    private _selectedLandingsId$ = new BehaviorSubject<number[]>([]);

    readonly selectedLanding$ = this._selectedLandingsId$.asObservable();

    constructor(private readonly shortEntityListService: ShortEntityListService, private readonly offerDetailQuery: OfferDetailQuery) {}

    get landings$(): Observable<ShortOfferLandingPageModel[]> {
        return this._landingsParams$.pipe(
            debounceTime(200),
            switchMap((params: ShortOfferLandingParamsModel) =>
                this.shortEntityListService
                    .list(ShortEntityNameEnum.LandingPage, {
                        offerId: this.offerDetailQuery.id,
                        ...params
                    })
                    .pipe(
                        tap(({ pagination: { page_count, current_page } }) => {
                            this._landingsPageCount = page_count;
                            this._currentPage = current_page;
                        }),
                        pluck('results')
                    )
            ),
            scan((acc, items) => {
                const newAcc = this._currentPage === 1 ? [] : acc;
                return ArrayUtil.unique(newAcc, items, 'id');
            }, []),
            switchMap((items: ShortOfferLandingPageModel[]) => {
                const currentIds = ArrayUtil.pickByKey(items, 'id');
                const emptyIds = this._selectedLandingsId$.value.filter((id) => !currentIds.includes(id));
                return emptyIds.length > 0 ? forkJoin([of(items), this.getEmptyLandings$(emptyIds)]) : of(items);
            }),
            map((res) => res.flat()),
            shareReplay()
        );
    }

    reloadLandings(): void {
        this.updateLandingsParams('page', 1);
    }

    scrolledLandingsToEnd(): void {
        if (this._landingsSavedLastPage < this._landingsPageCount) {
            this._landingsSavedLastPage += 1;
            this.updateLandingsParams('page', this._landingsSavedLastPage);
        }
    }

    updateLandingsParams<K extends keyof ShortOfferLandingParamsModel>(key: K, value: ShortOfferLandingParamsModel[K]): void {
        this._landingsParams$.next({
            ...this._landingsParams$.value,
            [key]: value
        });
    }

    setSelectedLandingsId$(ids: number[]): void {
        this._selectedLandingsId$.next(ids);
    }

    private getEmptyLandings$(ids: number[]): Observable<ShortOfferLandingPageModel[]> {
        const requestsToLandingsById$ = ids.map((id) =>
            this.shortEntityListService
                .list(ShortEntityNameEnum.LandingPage, {
                    offerId: this.offerDetailQuery.id,
                    search: id.toString(),
                    exact: 'id'
                })
                .pipe(pluck('results'))
        );
        return forkJoin([...requestsToLandingsById$]).pipe(map((items) => items.flat()));
    }
}
