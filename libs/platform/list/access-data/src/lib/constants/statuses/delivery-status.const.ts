import { ScaleoStatusColorEnum } from '../../enums/statusses';
import { DeliveryStatusNameEnum, DeliveryStatusTranslateEnum } from '../../enums/statusses/delivery-status.enum';

export const DELIVERY_STATUS_TRANSLATE_MAP = {
    [DeliveryStatusNameEnum.Success]: DeliveryStatusTranslateEnum.Success,
    [DeliveryStatusNameEnum.Fail]: DeliveryStatusTranslateEnum.Fail
} as const;

export const DELIVERY_STATUS_COLOR_MAP = {
    [DeliveryStatusNameEnum.Success]: ScaleoStatusColorEnum.Green,
    [DeliveryStatusNameEnum.Fail]: ScaleoStatusColorEnum.Red
} as const;
