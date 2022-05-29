import { PaymentStatusEnum, PaymentStatusTranslateEnum } from '../../enums/statusses';

export const PAYMENT_STATUS_TRANSLATE_MAP = Object.freeze({
    [PaymentStatusEnum.Paid]: PaymentStatusTranslateEnum.Paid,
    [PaymentStatusEnum.InProgress]: PaymentStatusTranslateEnum.InProgress,
    [PaymentStatusEnum.Unpaid]: PaymentStatusTranslateEnum.Unpaid
});
