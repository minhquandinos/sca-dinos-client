import { BooleanEnum } from '@scaleo/core/data';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferAffiliateAccessPayloadParamsDto {
    visible_type: OffersVisibilityIdEnum;
    allowed_affiliates: string;
    denied_affiliates: string;
    ask_approval_questions: BooleanEnum;
    questions: string;
}

export interface OfferAffiliateAccessFormControlModel {
    visible_type: OffersVisibilityIdEnum;
    allowed_affiliates: number[];
    denied_affiliates: number[];
    ask_approval_questions: BooleanEnum;
    questions: string;
}
