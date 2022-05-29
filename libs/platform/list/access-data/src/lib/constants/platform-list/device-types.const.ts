import { DeviceTypesIdEnum, DeviceTypesTranslateEnum } from '../../enums/platform-list';

export const DEVICE_TYPES_TRANSLATE_MAP = {
    [DeviceTypesIdEnum.Desktop]: DeviceTypesTranslateEnum.Desktop,
    [DeviceTypesIdEnum.Smartphone]: DeviceTypesTranslateEnum.Smartphone,
    [DeviceTypesIdEnum.Tablet]: DeviceTypesTranslateEnum.Tablet,
    [DeviceTypesIdEnum.Console]: DeviceTypesTranslateEnum.Console,
    [DeviceTypesIdEnum.Tv]: DeviceTypesTranslateEnum.Tv,
    [DeviceTypesIdEnum.CarBrowser]: DeviceTypesTranslateEnum.CarBrowser,
    [DeviceTypesIdEnum.SmartDisplay]: DeviceTypesTranslateEnum.SmartDisplay,
    [DeviceTypesIdEnum.Camera]: DeviceTypesTranslateEnum.Camera,
    [DeviceTypesIdEnum.PortableMediaPlayer]: DeviceTypesTranslateEnum.PortableMediaPlayer
} as const;
