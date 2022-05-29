import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { CustomDateRangeUtil, DateUtil } from '@scaleo/platform/date/util';

import { DAY_PRESETS_MAPPER } from './constants/day-presets.const';
import { DayPresetChangedModel, DayPresetsModel } from './models/day-presets.model';
import { DayPresetKeyType, DayPresetsType } from './types/day-presets.type';

@Component({
    selector: 'app-date-presets',
    template: `
        <div
            class="date-presets__item d-flex justify-content-center"
            *ngFor="let item of dayPresets"
            (click)="presetHandler(item.preset)"
            [ngClass]="{ active: selected?.selectedRange === item.preset }"
        >
            {{ dayPresetsMapper[item.preset] }}{{ item.label | async }}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPresetsComponent {
    @HostBinding('class') hostClass = 'date-presets d-flex align-items-center';

    @Input() defaultSelected: DayPresetKeyType = CustomDateRangeTitleEnum.Last14Days;

    private day$ = this.translate.stream('interface.date.day.short');

    @Input() dayPresets: DayPresetsModel[] = [
        {
            preset: CustomDateRangeTitleEnum.Today,
            label: this.day$
        },
        {
            preset: CustomDateRangeTitleEnum.Last7Days,
            label: this.day$
        },
        {
            preset: CustomDateRangeTitleEnum.Last14Days,
            label: this.day$
        },
        {
            preset: CustomDateRangeTitleEnum.Last30Days,
            label: this.day$
        },
        {
            preset: CustomDateRangeTitleEnum.Last90Days,
            label: this.day$
        }
    ];

    @Output() changed: EventEmitter<DayPresetChangedModel> = new EventEmitter<DayPresetChangedModel>();

    readonly dayPresetsMapper = DAY_PRESETS_MAPPER;

    selected: DayPresetChangedModel = undefined;

    constructor(private customDateRangeService: CustomDateRangeService, private translate: TranslateService) {
        this.setSelectedPreset(this.defaultSelected);
    }

    presetHandler(selectedRange: DayPresetsType): void {
        this.setSelectedPreset(selectedRange);
        this.changed.emit(this.selected);
    }

    private setSelectedPreset(selectedRange: DayPresetsType): void {
        const { rangeTo, rangeFrom } = CustomDateRangeUtil.getPresetDate(selectedRange);
        this.selected = {
            selectedRange,
            rangeFrom: DateUtil.makeDate(rangeFrom),
            rangeTo: DateUtil.makeDate(rangeTo),
            diffDays: CustomDateRangeUtil.countDiffDate({ rangeFrom, rangeTo })
        };
    }
}
