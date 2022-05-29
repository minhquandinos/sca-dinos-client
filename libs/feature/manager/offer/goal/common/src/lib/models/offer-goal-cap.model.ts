import { GoalsCapsPeriodsEnum, GoalsCapsTypesEnum } from '@scaleo/platform/list/access-data';

export interface OfferGoalCapModel {
    period: GoalsCapsPeriodsEnum;
    type: GoalsCapsTypesEnum;
    value: number;
}
