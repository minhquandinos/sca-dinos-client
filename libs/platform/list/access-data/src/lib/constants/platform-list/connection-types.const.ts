import { ConnectionTypesIdEnum, ConnectionTypesTranslateEnum } from '../../enums/platform-list';

export const CONNECTION_TYPES_TRANSLATE_MAP = {
    [ConnectionTypesIdEnum.WifiCable]: ConnectionTypesTranslateEnum.WifiCable,
    [ConnectionTypesIdEnum.MobileInternet]: ConnectionTypesTranslateEnum.MobileInternet
} as const;
