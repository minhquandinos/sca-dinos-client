import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { ShortGeoNameModel } from '@scaleo/shared/data-access/short-entity-list';

import { OfferAllowedDeniedIdEnum } from './offer-allowed-denied.enum';

export type ExtendedTargetingConditionType = BaseIdTitleModel & {
    title_en: string;
    title_ru: string;
};

export interface OfferTargetingGeoModel extends Omit<ShortGeoNameModel, 'country_code'> {
    code?: string;
}

export interface OfferTargetingDto {
    gt_included_ids: OfferTargetingGeoModel[];
    gt_excluded_ids: OfferTargetingGeoModel[];
    extended_targeting: ExtendedTargetingDto[];
    strict_targeting: BooleanEnum;
}

interface ExtendedTargetingDto {
    type: BaseIdTitleModel;
    permission: BaseIdTitleModel<OfferAllowedDeniedIdEnum>;
    conditions: ExtendedTargetingConditionType[];
}

export interface OfferTargetingRuleModel {
    type: BaseIdTitleModel;
    permission: BaseIdTitleModel<OfferAllowedDeniedIdEnum>;
    conditions: string | ExtendedTargetingConditionType[];
}

export interface OfferTargetingModel {
    gt_included_ids: OfferTargetingGeoModel[];
    gt_excluded_ids: OfferTargetingGeoModel[];
    extended_targeting: OfferTargetingRuleModel[];
    strict_targeting: BooleanEnum;
}
