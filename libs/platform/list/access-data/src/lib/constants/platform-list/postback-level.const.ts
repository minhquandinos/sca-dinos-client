import { PostbackLevelIdEnum, PostbackLevelTranslateEnum } from '../../enums/platform-list/postback-level.enum';

export const POSTBACK_LEVEL_TRANSLATE_MAP = Object.freeze({
    [PostbackLevelIdEnum.Global]: PostbackLevelTranslateEnum.Global,
    [PostbackLevelIdEnum.Offer]: PostbackLevelTranslateEnum.Offer
});
