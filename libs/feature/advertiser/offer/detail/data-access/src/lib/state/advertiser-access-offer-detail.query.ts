import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseStateQuery } from '@scaleo/core/state/state';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';

import { AdvertiserAccessOfferDetailStore, AdvertiserAccessOfferViewState } from './advertiser-access-offer-detail.store';

@Injectable()
export class AdvertiserAccessOfferDetailQuery extends BaseStateQuery<AdvertiserAccessOfferViewState> {
    constructor(protected store: AdvertiserAccessOfferDetailStore, private readonly profileQuery: ProfileQuery) {
        super(store);
    }

    get links$(): Observable<OfferLandingPageModel[]> {
        return this.select('links').pipe(
            map((links) => {
                return this.transformLinks(links);
            })
        );
    }

    private transformLinks(links: OfferLandingPageModel[]): OfferLandingPageModel[] {
        return links.map((link: OfferLandingPageModel) => {
            let { url } = link;

            if (link.type === 1) {
                url = this.convertAdditionalLink(null);
            }
            if (link.type === 3) {
                url = this.convertAdditionalLink(link.id);
            }
            return {
                ...link,
                url
            } as OfferLandingPageModel;
        });
    }

    private convertAdditionalLink(id: number): string {
        const domain = this.getValue().tracking_domain?.name;
        const trackingLink = `${domain}/click?o=${this.getValue().id}&a=${this.profileQuery.profile.id}`;
        return id ? `${trackingLink}&link_id=${id}` : trackingLink;
    }
}
