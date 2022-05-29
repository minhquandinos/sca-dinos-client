import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';

export type DayPresetsType =
    | CustomDateRangeTitleEnum.Today
    | CustomDateRangeTitleEnum.Last7Days
    | CustomDateRangeTitleEnum.Last14Days
    | CustomDateRangeTitleEnum.Last30Days
    | CustomDateRangeTitleEnum.Last90Days;

export type DayPresetKeyType = keyof Record<DayPresetsType, string>;
