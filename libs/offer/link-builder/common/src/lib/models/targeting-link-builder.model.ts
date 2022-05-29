import { Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { OfferCreativeInterface, OfferUrlsInterface } from '@scaleo/offer/common';

import { TargetingLinkBuilderEnum } from '../enums/targeting-link-builder.enum';

interface TargetingLinkBuilderModel {
    type: TargetingLinkBuilderEnum;
    id: number;
    affiliateId?: number;
    isAffiliateAccess?: boolean;
}

export interface TargetingLinkBuilderOfferConfigModel extends TargetingLinkBuilderModel {
    links?: OfferUrlsInterface[];
    creatives?: OfferCreativeInterface[];
    defaultLinkId: number | any;
    creatives$?: Observable<BaseObjectModel[]>;
}

export type TargetingLinkBuilderSmartLinkConfigModel = TargetingLinkBuilderModel;

export interface TargetingLinkBuilderInputDataModel<C = any> {
    trackingDomain: string;
    haveDeepLink?: boolean;
    config: C;
}
