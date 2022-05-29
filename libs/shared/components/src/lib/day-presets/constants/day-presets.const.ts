import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';

export const DAY_PRESETS_MAPPER = {
    [CustomDateRangeTitleEnum.Today]: 1,
    [CustomDateRangeTitleEnum.Last7Days]: 7,
    [CustomDateRangeTitleEnum.Last14Days]: 14,
    [CustomDateRangeTitleEnum.Last30Days]: 30,
    [CustomDateRangeTitleEnum.Last90Days]: 90
};
