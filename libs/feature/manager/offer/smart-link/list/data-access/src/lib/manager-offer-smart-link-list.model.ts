import { Expose, Transform } from 'class-transformer';

import { PageRequestModel, ShortResponseInterface, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { AbstractSmartLinkModel, SmartLinkStatusesType } from '@scaleo/offer/smart-link/common';

export class ManagerOfferSmartLinkListModel extends AbstractSmartLinkModel {
    @Expose()
    other_offers_count?: number = undefined;

    @Expose()
    traffic_distribution?: string = undefined;

    @Expose()
    get traffic_distribution_title(): string {
        return this.traffic_distribution?.replace(/ /g, '_').toLowerCase();
    }

    @Expose()
    domain_for_tracking_link: string = undefined;

    @Expose()
    offers_with_tags?: ShortResponseInterface[] = [];
}

export interface ManagerOfferSmartLinkListQueryParamsModel
    extends SortRequestModel,
        PageRequestModel,
        StatusRequestModel<SmartLinkStatusesType | ''> {}
