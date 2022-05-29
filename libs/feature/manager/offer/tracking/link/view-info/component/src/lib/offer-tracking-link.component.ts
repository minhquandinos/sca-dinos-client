import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OFFER_TRACKING_PROVIDER, OfferTrackingService } from '@scaleo/feature/manager/offer/tracking/link/view-info/data-access';
import { OfferTrackingInterface } from '@scaleo/offer/common';
import {
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderOfferConfigModel
} from '@scaleo/offer/link-builder/common';
import { TargetingLinkBuilderComponent } from '@scaleo/offer/targeting-link-builder/modal-form';
import { BaseStatusNameEnum } from '@scaleo/platform/list/access-data';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { OFFER_TRACKING_LINK_PARAMS } from './constants/offer-tracking-link-params.const';

type LinkParamType = [string, string | number];

@Component({
    selector: 'app-offer-tracking-link',
    templateUrl: './offer-tracking-link.component.html',
    providers: [OFFER_TRACKING_PROVIDER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferTrackingLinkComponent implements OnInit {
    @HostBinding('class') hostClass = 'offer-tracking-link';

    readonly affIdInfo = '{affiliate_id}';

    readonly params = OFFER_TRACKING_LINK_PARAMS;

    readonly offerId = this._offerDetailQuery.id;

    links: string[];

    trackingDomain: string;

    private _trackingData: OfferTrackingInterface;

    constructor(
        private readonly _service: OfferTrackingService,
        private readonly _offerDetailQuery: OfferDetailQuery,
        private readonly _modal3: Modal3Service
    ) {}

    ngOnInit(): void {
        this._loadFormData();
    }

    openLinkBuilder(): void {
        const config: TargetingLinkBuilderOfferConfigModel = {
            type: TargetingLinkBuilderEnum.Default,
            id: this.offerId,
            defaultLinkId: this._offerDetailQuery.getValue().defaultLandingPage.id,
            // TODO quick fix
            creatives$: this._service.creatives(this.offerId, { perPage: 100, status: BaseStatusNameEnum.Active })
        };

        const { trackingDomain } = this;

        const data: TargetingLinkBuilderInputDataModel = {
            trackingDomain,
            haveDeepLink: Boolean(this._trackingData.deep_linking),
            config
        };

        this._modal3.editForm<any, TargetingLinkBuilderInputDataModel>(TargetingLinkBuilderComponent, {
            data
        });
    }

    private _loadFormData(): void {
        firstValueFrom(this._service.view(this.offerId)).then((tracking) => {
            this._trackingData = tracking;
            this.trackingDomain = this._getTrackingDomain;
            this.links = this._getLinks;
        });
    }

    private get _getTrackingDomain(): string {
        const { tracking_domains, tracking_domain_id } = this._trackingData;
        return tracking_domains.find((domain) => domain.id === tracking_domain_id).name;
    }

    private get _getLinks(): string[] {
        const offer: LinkParamType = ['o', this.offerId];
        const affiliate: LinkParamType = ['a', this.affIdInfo];

        const params: {
            [key: string]: LinkParamType[];
        } = {
            url1: [offer, affiliate, ['aff_click_id', 'a3p22snfbg53shfgtekt3s']],
            url2: [offer, affiliate, ['sub_id1', 'Google'], ['sub_id2', 'Ads']],
            url3: [offer, affiliate, ['aff_param1', 'John'], ['aff_param2', 'john@gmail.com']],
            url4: [offer, affiliate, ['deep_link', 'https://brand.com/catalog/item/123']]
        };

        try {
            return Object.keys(params).map((param) => {
                const url = new URL('click', this.trackingDomain);
                params[param].forEach(([key, value]) => {
                    url.searchParams.append(key, value.toString());
                });
                return decodeURI(url.href);
            });
        } catch {
            return [];
        }
    }
}
