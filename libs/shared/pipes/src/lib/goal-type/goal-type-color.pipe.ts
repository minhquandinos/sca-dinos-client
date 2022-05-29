import { Pipe, PipeTransform } from '@angular/core';

import { GOAL_TYPES_COLOR_MAP } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'goalTypeColor'
})
export class GoalTypeColorPipe implements PipeTransform {
    transform(value: string | number): string {
        return GOAL_TYPES_COLOR_MAP?.[value];
    }
}
