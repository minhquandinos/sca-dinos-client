import { Expose, Type } from 'class-transformer';

import { OffersTargetingRulesNameEnum } from '@scaleo/platform/list/access-data';

export class OfferTargetingGeoElementModel {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    code: string;
}

export class OfferTargetingListGeoModel {
    @Expose()
    allowed: OfferTargetingGeoElementModel[];

    @Expose()
    denied: OfferTargetingGeoElementModel[];
}

export class OffersTargetingDefaultModel {
    @Expose()
    allowed: string[];

    @Expose()
    denied: string[];
}

export class OfferTargetingListModel {
    @Expose()
    @Type((): any => OfferTargetingListGeoModel)
    geo?: OfferTargetingListGeoModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    connectionType?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    mobileOperator?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    deviceType?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    deviceOs?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    deviceOsVersion?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    deviceBrand?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    deviceModel?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    browser?: OffersTargetingDefaultModel;

    @Expose()
    @Type((): any => OffersTargetingDefaultModel)
    language?: OffersTargetingDefaultModel;
}

export type OfferTargetingType = (OfferTargetingListGeoModel | OffersTargetingDefaultModel) & {
    key: keyof Record<OffersTargetingRulesNameEnum, string>;
};
