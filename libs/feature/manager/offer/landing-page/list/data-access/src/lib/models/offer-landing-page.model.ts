import { Expose, Type } from 'class-transformer';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { OfferTargetingListModel } from '@scaleo/offer/common';
import { OfferLandingPageStatusIdEnum } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export class OfferLandingPageModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    type: number;

    @Expose()
    type_selected: BaseIdTitleModel = undefined;

    @Expose()
    url: string = undefined;

    @Expose()
    preview: string = undefined;

    @Expose({ name: 'visible_to_all_affiliates' })
    private _visible_to_all_affiliates: number = undefined;

    @Expose()
    get visible_to_all_affiliates(): boolean {
        return Util.numToBoolean(+this._visible_to_all_affiliates);
    }

    @Expose()
    visible_to_specific_affiliates_only: BaseIdTitleModel[];

    @Expose()
    @Type((): any => OfferTargetingListModel)
    targeting: OfferTargetingListModel;

    @Expose()
    status: OfferLandingPageStatusIdEnum;
}
