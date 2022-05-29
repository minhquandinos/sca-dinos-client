import { BASE_STATUS_TRANSLATE_MAP, BaseStatusIdEnum, ScaleoStatusColorEnum } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusBase implements StatusInterface {
    constructor(private status: BaseStatusIdEnum) {}

    makeColor(): string {
        const color: Record<BaseStatusIdEnum, ScaleoStatusColorEnum> = {
            [BaseStatusIdEnum.Active]: ScaleoStatusColorEnum.Green,
            [BaseStatusIdEnum.Pending]: ScaleoStatusColorEnum.Orange,
            [BaseStatusIdEnum.Inactive]: ScaleoStatusColorEnum.Red
        };
        return color?.[this.status];
    }

    makeLabel(): string {
        const label = BASE_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
