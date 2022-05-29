import { Expose } from 'class-transformer';

import { ShortResponseInterface } from '@scaleo/core/data';
import { BaseLeadsReceiveCampaignModel } from '@scaleo/feature/manager/leads/receive/common';
import { GoalOfferModel } from '@scaleo/offer/common';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { StatusesId } from '@scaleo/ui-kit/elements';

export class LeadsReceiveCampaignList extends BaseLeadsReceiveCampaignModel {
    @Expose()
    offer: ShortResponseInterface = undefined;

    @Expose()
    goal: GoalOfferModel = undefined;

    @Expose()
    fields: CampaignFieldsCountModel = undefined;

    @Expose()
    validations: number = undefined;
}

interface CampaignFieldsCountModel {
    required_fields_count: string;
    optional_fields_count: string;
}
