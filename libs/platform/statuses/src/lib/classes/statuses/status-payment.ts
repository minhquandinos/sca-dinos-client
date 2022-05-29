import { PAYMENT_STATUS_TRANSLATE_MAP, PaymentStatusEnum, ScaleoStatusColorEnum } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusPayment implements StatusInterface {
    constructor(private status: PaymentStatusEnum) {}

    makeColor(): string {
        const color: Record<PaymentStatusEnum, ScaleoStatusColorEnum> = {
            [PaymentStatusEnum.Paid]: ScaleoStatusColorEnum.Green,
            [PaymentStatusEnum.InProgress]: ScaleoStatusColorEnum.Orange,
            [PaymentStatusEnum.Unpaid]: ScaleoStatusColorEnum.Red
        };
        return color[this.status];
    }

    makeLabel(): string {
        const label = PAYMENT_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
