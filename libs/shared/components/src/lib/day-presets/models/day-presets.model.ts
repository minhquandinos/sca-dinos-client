import { Observable } from 'rxjs';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';

import { DayPresetsType } from '../types/day-presets.type';

export interface DayPresetsModel {
    label: Observable<string>;
    preset: DayPresetsType;
}

export interface DayPresetChangedModel extends Pick<CustomDateRangeModel, 'rangeFrom' | 'rangeTo' | 'diffDays'> {
    selectedRange: DayPresetsType;
}
