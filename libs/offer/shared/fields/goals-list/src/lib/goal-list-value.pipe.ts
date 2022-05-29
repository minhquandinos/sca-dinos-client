import { Pipe, PipeTransform } from '@angular/core';

import { GoalOfferModel } from '@scaleo/offer/common';
import { Util } from '@scaleo/utils';

@Pipe({
    name: 'goalListValue'
})
export class GoalListValuePipe implements PipeTransform {
    transform(goal: GoalOfferModel): number {
        const numberValue = (value: string): number | undefined => (value && Util.isNumber(value) ? +value : undefined);

        const payout = numberValue(goal?.payout);
        const revenue = numberValue(goal?.revenue);

        return revenue || payout;
    }
}
