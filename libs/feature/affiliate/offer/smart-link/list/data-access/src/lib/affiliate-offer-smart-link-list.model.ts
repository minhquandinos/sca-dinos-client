import { Expose, Transform } from 'class-transformer';

import { PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { AbstractSmartLinkModel, SmartLinkStatusesType } from '@scaleo/offer/smart-link/common';

export class AffiliateOfferSmartLinkListModel extends AbstractSmartLinkModel {
    @Expose()
    @Transform(
        ({ value }) => {
            console.log(value || []);
            return (value || '')?.split(',').filter((type: string) => type);
        },
        { toClassOnly: true }
    )
    allowed_traffic_types?: string = undefined;

    @Expose()
    domain_for_tracking_link: string = undefined;
}

export interface AffiliateOfferSmartLinkListQueryParamsModel
    extends SortRequestModel,
        PageRequestModel,
        StatusRequestModel<SmartLinkStatusesType | ''> {}
