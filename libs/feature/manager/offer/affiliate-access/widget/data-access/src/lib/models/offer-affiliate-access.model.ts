import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferAffiliateAccessDto {
    visible_type: OffersVisibilityIdEnum;
    allowed_affiliates: BaseIdTitleModel[];
    denied_affiliates: BaseIdTitleModel[];
    ask_approval_questions: BooleanEnum;
    questions: string;
}

export interface OfferAffiliateAccessModel {
    visible_type: OffersVisibilityIdEnum;
    allowed_affiliates: BaseIdTitleModel[];
    denied_affiliates: BaseIdTitleModel[];
    ask_approval_questions: BooleanEnum;
    questions?: string;
}
