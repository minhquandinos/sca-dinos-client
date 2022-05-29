import { Expose } from 'class-transformer';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { StatusesId } from '@scaleo/ui-kit/elements';

export enum CampaignFieldTypeEnum {
    Required = 1,
    Optional = 2
}

export abstract class BaseLeadsReceiveCampaignModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    status: StatusesId = undefined;

    @Expose()
    notes: string = undefined;

    @Expose()
    currency?: CurrencyEnum = undefined;
}

export interface LeadsReceiveCampaignFieldModel {
    type: CampaignFieldTypeEnum;
    value: string;
    name: string;
}

export const receiveLeadsCampaignStatuses: PlatformListsFormatInterface[] = [
    { title: 'active', id: StatusesId.Active },
    { title: 'inactive', id: StatusesId.Inactive }
];
