import { Pipe, PipeTransform } from '@angular/core';

import { GoalTypesEnum } from '../../../../../../../../../offer/common/src/lib/offer/offer.interface';
import { PlatformListsFormatInterface } from '../../../../../../../../../platform/list/access-data/src/lib/models/platform.lists.interface';

@Pipe({
    name: 'hideCpcGoalType'
})
export class HideCpcGoalTypePipe implements PipeTransform {
    transform(
        goalTypes: PlatformListsFormatInterface[],
        hasCpcGoal: boolean,
        currentGoalType: GoalTypesEnum
    ): PlatformListsFormatInterface[] {
        if (goalTypes && hasCpcGoal && currentGoalType !== GoalTypesEnum.CPC) {
            return goalTypes.filter((type) => type.id !== GoalTypesEnum.CPC);
        }
        return goalTypes;
    }
}
