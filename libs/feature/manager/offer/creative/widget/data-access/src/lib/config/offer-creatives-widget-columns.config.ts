import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

import { OfferCreativesWidgetColumnEnum } from '../enums/offer-creatives-widget-column.enum';

const columns: UiSimpleTableHeaderModel[] = [
    {
        value: OfferCreativesWidgetColumnEnum.Title,
        translateSchema: 'table.column.title'
    },
    {
        value: OfferCreativesWidgetColumnEnum.Type,
        translateSchema: 'table.column.type',
        width: '8%'
    },
    {
        value: OfferCreativesWidgetColumnEnum.Details,
        translateSchema: 'table.column.details',
        width: '16%'
    },
    {
        value: OfferCreativesWidgetColumnEnum.OfferUrl,
        translateSchema: 'table.column.offer_url',
        width: '20%'
    },
    {
        value: OfferCreativesWidgetColumnEnum.Preview,
        translateSchema: 'table.column.preview'
    },
    {
        value: OfferCreativesWidgetColumnEnum.TrackingUrl,
        translateSchema: 'table.column.tracking_url'
    },
    {
        value: OfferCreativesWidgetColumnEnum.HtmlCode,
        translateSchema: 'table.column.html_code'
    }
];

export const offerCreativesWidgetColumnsConfig = getConfig<UiSimpleTableHeaderModel[]>(columns);
