import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GoalTypesEnum } from '@scaleo/offer/common';

@Component({
    selector: 'app-goal-chip',
    templateUrl: './goal-chip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalChipComponent {
    @Input() set goal(value: GoalTypesEnum) {
        if (value) {
            const colorClass = {
                [GoalTypesEnum.CPA]: 'cpa',
                [GoalTypesEnum.CPI]: 'cpi',
                [GoalTypesEnum.CPL]: 'cpl',
                [GoalTypesEnum.CPS]: 'cps',
                [GoalTypesEnum.CPC]: 'cpc'
            };
            this.color = colorClass[value];
        }
    }

    color: string;
}
