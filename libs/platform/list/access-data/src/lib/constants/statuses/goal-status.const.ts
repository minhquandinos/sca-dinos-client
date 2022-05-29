import { GoalStatusIdEnum, GoalStatusNameEnum, GoalStatusTranslateEnum, ScaleoStatusColorEnum } from '../../enums/statusses';
import { entityStatusMatch } from './base-status.const';

export const GOALS_STATUS_TRANSLATE_MAP = Object.freeze({
    [GoalStatusIdEnum.Active]: GoalStatusTranslateEnum.Active,
    [GoalStatusIdEnum.Inactive]: GoalStatusTranslateEnum.Inactive,
    [GoalStatusIdEnum.Deleted]: GoalStatusTranslateEnum.Deleted
});

export const GOALS_STATUS_COLOR_MAP = {
    [GoalStatusIdEnum.Active]: ScaleoStatusColorEnum.Green,
    [GoalStatusIdEnum.Inactive]: ScaleoStatusColorEnum.Orange,
    [GoalStatusIdEnum.Deleted]: ScaleoStatusColorEnum.Red
} as const;

export const offerGoalMatchStatus = (status: GoalStatusIdEnum | GoalStatusNameEnum) =>
    entityStatusMatch<GoalStatusNameEnum, GoalStatusIdEnum>(GoalStatusNameEnum, GoalStatusIdEnum, status);
