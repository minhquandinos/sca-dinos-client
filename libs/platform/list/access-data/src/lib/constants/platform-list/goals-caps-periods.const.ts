import { GoalsCapsPeriodsEnum, GoalsCapsPeriodsTranslateEnum } from '../../enums/platform-list';

export const GOAL_CAPS_PERIODS_TRANSLATE_MAP = Object.freeze({
    [GoalsCapsPeriodsEnum.Daily]: GoalsCapsPeriodsTranslateEnum.Daily,
    [GoalsCapsPeriodsEnum.Weekly]: GoalsCapsPeriodsTranslateEnum.Weekly,
    [GoalsCapsPeriodsEnum.Monthly]: GoalsCapsPeriodsTranslateEnum.Monthly,
    [GoalsCapsPeriodsEnum.Total]: GoalsCapsPeriodsTranslateEnum.Total
});
