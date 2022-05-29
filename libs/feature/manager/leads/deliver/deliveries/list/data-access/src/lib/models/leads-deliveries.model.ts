import { PageRequestModel, ShortResponseInterface, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { StatusesId } from '@scaleo/ui-kit/elements';

export interface LeadsDeliveriesQueryParamsModel extends PageRequestModel, StatusRequestModel, PageRequestModel, SortRequestModel {
    campaigns: number[];
}

export interface LeadsDeliveriesQueryParamsDto extends Omit<LeadsDeliveriesQueryParamsModel, 'campaigns'> {
    campaigns: string;
}

export interface LeadsDeliveriesModel {
    id: number;
    title: string;
    campaign: ShortResponseInterface;
    notes?: string;
    status: StatusesId;
}

export interface LeadsDeliveryViewModel {
    id: number;
    status: StatusesId;
    title: string;
    campaign_id: number;
    instructions: string;
    notes?: string;
    success_reply: string;
}

export const deliveryStatuses: PlatformListsFormatInterface[] = [
    { title: 'active', id: StatusesId.Active },
    { title: 'inactive', id: StatusesId.Inactive }
];
