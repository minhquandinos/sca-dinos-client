import { OfferGoalListModel } from '@scaleo/feature/manager/offer/goal/list/data-access';
import { GoalStatusIdEnum, GoalTypeEnum } from '@scaleo/platform/list/access-data';

export class OfferConfigGoalsUtil {
    static showDefaultButton(items: OfferGoalListModel[]): boolean {
        const activeItems = items
            .filter((item) => item.status === GoalStatusIdEnum.Active)
            .filter((item) => item.type.id !== GoalTypeEnum.CPC);
        return activeItems.length > 1;
    }
}
