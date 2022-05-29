import { CustomParamsTypesIdEnum, CustomParamsTypesTranslateEnum } from '../../enums/platform-list';

export const CUSTOM_PARAMS_TYPES_TRANSLATE_MAP = {
    [CustomParamsTypesIdEnum.Include]: CustomParamsTypesTranslateEnum.Include,
    [CustomParamsTypesIdEnum.Exclude]: CustomParamsTypesTranslateEnum.Exclude
} as const;
