import { GoalTypeEnum, GoalTypeName, GoalTypesColorEnum, GoalTypesTranslateEnum } from '../../enums/platform-list';

export const GOAL_TYPES_LIST_TRANSLATE_MAP: Record<GoalTypeEnum, GoalTypesTranslateEnum> = {
    [GoalTypeEnum.CPC]: GoalTypesTranslateEnum.CPC,
    [GoalTypeEnum.CPA]: GoalTypesTranslateEnum.CPA,
    [GoalTypeEnum.CPL]: GoalTypesTranslateEnum.CPL,
    [GoalTypeEnum.CPS]: GoalTypesTranslateEnum.CPS,
    [GoalTypeEnum.CPI]: GoalTypesTranslateEnum.CPI
} as const;

export const GOAL_TYPES_COLOR_MAP: Record<GoalTypeEnum, GoalTypesColorEnum> = {
    [GoalTypeEnum.CPC]: GoalTypesColorEnum.CPC,
    [GoalTypeEnum.CPA]: GoalTypesColorEnum.CPA,
    [GoalTypeEnum.CPL]: GoalTypesColorEnum.CPL,
    [GoalTypeEnum.CPS]: GoalTypesColorEnum.CPS,
    [GoalTypeEnum.CPI]: GoalTypesColorEnum.CPI
} as const;

export const GOAL_TYPES_NAME_MAP: Record<GoalTypeEnum, GoalTypeName> = {
    [GoalTypeEnum.CPC]: GoalTypeName.CPC,
    [GoalTypeEnum.CPA]: GoalTypeName.CPA,
    [GoalTypeEnum.CPL]: GoalTypeName.CPL,
    [GoalTypeEnum.CPS]: GoalTypeName.CPS,
    [GoalTypeEnum.CPI]: GoalTypeName.CPI
} as const;
