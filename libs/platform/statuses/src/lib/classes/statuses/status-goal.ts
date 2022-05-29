import { GOALS_STATUS_TRANSLATE_MAP, GoalStatusIdEnum, ScaleoStatusColorEnum } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusGoal implements StatusInterface {
    constructor(private status: GoalStatusIdEnum) {}

    makeColor(): string {
        const color: Record<GoalStatusIdEnum, ScaleoStatusColorEnum> = {
            [GoalStatusIdEnum.Active]: ScaleoStatusColorEnum.Green,
            [GoalStatusIdEnum.Inactive]: ScaleoStatusColorEnum.Red,
            [GoalStatusIdEnum.Deleted]: ScaleoStatusColorEnum.Red
        };
        return color[this.status];
    }

    makeLabel(): string {
        const label = GOALS_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
