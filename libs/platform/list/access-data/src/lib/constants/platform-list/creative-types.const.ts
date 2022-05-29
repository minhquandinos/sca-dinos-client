import { CreativeTypesIdEnum, CreativeTypesTranslateEnum } from '../../enums/platform-list';

export const CREATIVE_TYPES_LIST_TRANSLATE_MAP = {
    [CreativeTypesIdEnum.Banner]: CreativeTypesTranslateEnum.Banner,
    [CreativeTypesIdEnum.Email]: CreativeTypesTranslateEnum.Email,
    [CreativeTypesIdEnum.Html]: CreativeTypesTranslateEnum.Html,
    [CreativeTypesIdEnum.XMLFeed]: CreativeTypesTranslateEnum.XMLFeed
} as const;
