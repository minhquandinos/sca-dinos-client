import { Pipe, PipeTransform } from '@angular/core';

import { GOAL_TYPES_NAME_MAP, GoalTypeEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'goalTypeName'
})
export class GoalTypeNamePipe implements PipeTransform {
    transform(value: GoalTypeEnum): string {
        return GOAL_TYPES_NAME_MAP?.[value];
    }
}
