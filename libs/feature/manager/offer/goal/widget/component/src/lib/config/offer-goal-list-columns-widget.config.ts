import { OfferGoalsWidgetColumnEnum } from '@scaleo/feature/manager/offer/goal/widget/data-access';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const columns: UiSimpleTableHeaderModel[] = [
    {
        value: OfferGoalsWidgetColumnEnum.Title,
        translateSchema: 'table.column.title',
        width: '20%'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Type,
        translateSchema: 'table.column.type',
        width: '8%'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Revenue,
        translateSchema: 'table.column.revenue',
        width: '8%'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Payout,
        translateSchema: 'table.column.payout',
        width: '9%'
    },
    {
        value: OfferGoalsWidgetColumnEnum.ConversionStatus,
        translateSchema: 'table.column.initial_status',
        width: '55px'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Multiple,
        translateSchema: 'table.column.multiple',
        width: '55px'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Caps,
        translateSchema: 'table.column.caps',
        width: '55px'
    },
    {
        value: OfferGoalsWidgetColumnEnum.Postback,
        translateSchema: 'table.column.postback',
        width: '55px'
    }
];

export const offerGoalListColumnsWidgetConfig = getConfig<UiSimpleTableHeaderModel[]>(columns);
