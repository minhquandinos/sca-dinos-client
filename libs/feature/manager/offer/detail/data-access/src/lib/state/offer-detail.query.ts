import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseStateQuery } from '@scaleo/core/state/state';
import { OfferDefaultLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/default/data-access';
import { OfferConfigCountsModel } from '@scaleo/offer/common';
import { objectUtil } from '@scaleo/utils';

import { OfferDetailState, OfferDetailStore } from './offer-detail.store';

@Injectable({
    providedIn: 'root'
})
export class OfferDetailQuery extends BaseStateQuery<OfferDetailState> {
    constructor(protected store: OfferDetailStore) {
        super(store);
    }

    get id$(): Observable<number> {
        return this.select('id');
    }

    get id(): number {
        return this.getValue().id;
    }

    get currency(): string {
        return this.getValue().currency;
    }

    get title(): string {
        return this.getValue().title;
    }

    get defaultLandingPage$(): Observable<OfferDefaultLandingPageModel> {
        return this.select('defaultLandingPage');
    }

    get defaultLandingPagePreviewLink$(): Observable<string> {
        return this.select('defaultLandingPage').pipe(
            map(({ url = undefined, preview = undefined }: Partial<OfferDefaultLandingPageModel> = {}) => preview || url)
        );
    }

    defaultLandingPage<K extends keyof OfferDefaultLandingPageModel>(
        key?: K
    ): OfferDefaultLandingPageModel | OfferDefaultLandingPageModel[K] {
        const data = this.getValue()?.defaultLandingPage;
        if (key) {
            return objectUtil.property(data, key);
        }
        return data;
    }

    counts(key: keyof OfferConfigCountsModel): number {
        return this.getValue().counts?.[key];
    }
}
