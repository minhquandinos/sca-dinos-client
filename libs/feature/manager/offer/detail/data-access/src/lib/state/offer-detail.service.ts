import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, filter, map, retryWhen, startWith, switchMap, take, tap } from 'rxjs/operators';

import {
    OfferDefaultLandingPageModel,
    OfferDefaultLandingPageService
} from '@scaleo/feature/manager/offer/landing-page/default/data-access';
import { OfferConfigCountsModel } from '@scaleo/offer/common';

import { OfferDetailApi } from '../api/offer-detail.api';
import { OfferDetailQuery } from './offer-detail.query';
import { OfferDetailStore } from './offer-detail.store';

@Injectable({
    providedIn: 'root'
})
export class OfferDetailService {
    private _reload$: Subject<void> = new Subject<void>();

    constructor(
        private api: OfferDetailApi,
        private store: OfferDetailStore,
        private query: OfferDetailQuery,
        private readonly offerDefaultLandingPageService: OfferDefaultLandingPageService
    ) {}

    counts(): Observable<OfferConfigCountsModel> {
        return this._reload$.pipe(
            startWith(''),
            switchMap(() =>
                this.query.select('id').pipe(
                    switchMap((offerId) => this.api.counts(offerId)),
                    map((counts) => {
                        const newCounts = new Map();
                        Object.keys(counts).forEach((key) => {
                            if (key === 'offer-urls') {
                                newCounts.set('offer_urls', counts['offer-urls'].total);
                            }
                            if (key === 'custom-params') {
                                newCounts.set('custom_params', counts['custom-params'].total);
                            }
                            newCounts.set(key, (counts as any)?.[key].total);
                        });
                        return Object.fromEntries(newCounts);
                    }),
                    tap((counts) => {
                        this.store.update((state) => ({
                            ...state,
                            counts
                        }));
                    })
                )
            )
        );
    }

    setId(id: number): void {
        this.store.update((state) => ({
            ...state,
            id
        }));
    }

    setCurrency(currency: string): void {
        if (currency) {
            this.store.update({
                currency
            });
        }
    }

    setTitle(title: string): void {
        if (title) {
            this.store.update({
                title
            });
        }
    }

    reload(): void {
        this._reload$.next();
    }

    getCounts(key: keyof OfferConfigCountsModel): number {
        return this.store.getValue().counts[key];
    }

    resetStore(): void {
        this.store.reset();
    }

    setBaseDetailState(): Observable<unknown> {
        return this.query.select('title').pipe(
            map((title) => {
                if (!title) {
                    throw new Error();
                }
                return title;
            }),
            retryWhen((empty) =>
                empty.pipe(
                    take(1),
                    switchMap(() => this.view()),
                    delay(1000)
                )
            ),
            filter((title) => !!title)
        );
    }

    setDefaultLandingPage(defaultLandingPage: OfferDefaultLandingPageModel): void {
        this.store.update({
            defaultLandingPage
        });
    }

    get getDefaultLandingPage$(): Observable<OfferDefaultLandingPageModel> {
        return this.offerDefaultLandingPageService.get$.pipe(
            tap((response) => {
                this.setDefaultLandingPage(response);
            })
        );
    }

    updateDefaultLandingPage(value: Omit<OfferDefaultLandingPageModel, 'id'>): void {
        this.store.update((state) => ({
            ...state,
            defaultLandingPage: {
                ...state.defaultLandingPage,
                ...value
            }
        }));
    }

    // private setCounts(key: keyof OfferConfigCountsModel, count: number) {
    //     this.store.update((state) => ({
    //         ...state,
    //         counts: {
    //             ...state.counts,
    //             [key]: count
    //         }
    //     }));
    // }

    private view(): Observable<unknown> {
        return this.api.view(this.query.id).pipe(
            tap(({ title, currency: { code } }) => {
                this.setTitle(title);
                this.setCurrency(code);
            })
        );
    }
}
