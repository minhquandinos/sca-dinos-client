import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, share, startWith, switchMap } from 'rxjs/operators';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';

import { TopOfferApi } from '../api/top-offer.api';
import { TopOfferAvailableFiltersDto, TopOfferRequestType } from '../models/top-offer-widget.model';

@Injectable()
export class TopOfferService {
    private _filters$: BehaviorSubject<TopOfferRequestType> = new BehaviorSubject<TopOfferRequestType>({
        params: {
            sortField: 'value',
            sortDirection: 'desc',
            perPage: 6,
            page: 1,
            rangeFrom: '',
            rangeTo: '',
            preset: ''
        },
        payload: {
            filters: undefined
        }
    });

    readonly filter$ = this._filters$.asObservable();

    constructor(private api: TopOfferApi) {}

    data$(subject$: Subject<void>, date$: Observable<CustomDateRangeModel>, filters?: TopOfferAvailableFiltersDto): Observable<any> {
        return subject$.pipe(
            startWith(''),
            distinctUntilChanged(),
            switchMap(() => combineLatest([date$, this.filter$])),
            map(([date, requests]) => ({
                ...requests,
                params: {
                    ...requests.params,
                    rangeFrom: date.rangeFrom,
                    rangeTo: date.rangeTo,
                    preset: date.selectedRange
                },
                payload: {
                    ...requests.payload,
                    filters
                }
            })),
            debounceTime(300),
            switchMap((requests) => this.api.index(requests)),
            map((rows) => rows || []),
            share()
        );
    }

    get filter(): TopOfferRequestType {
        return this._filters$.value;
    }

    set filter(value: TopOfferRequestType) {
        this._filters$.next(value);
    }

    sorting(sort: UiTableSortInterface): void {
        const { params } = this.filter;
        this._filters$.next({
            ...this.filter,
            params: {
                ...params,
                sortField: sort.field,
                sortDirection: sort.direction
            }
        });
    }
}
