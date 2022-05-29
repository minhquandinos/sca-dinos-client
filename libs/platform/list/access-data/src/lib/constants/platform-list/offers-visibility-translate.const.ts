import { OffersVisibilityIdEnum, OffersVisibilityTranslateEnum } from '../../enums/platform-list';

export const OFFERS_VISIBILITY_TRANSLATE_MAP = {
    [OffersVisibilityIdEnum.Public]: OffersVisibilityTranslateEnum.Public,
    [OffersVisibilityIdEnum.Require]: OffersVisibilityTranslateEnum.Require,
    [OffersVisibilityIdEnum.Private]: OffersVisibilityTranslateEnum.Private
} as const;
