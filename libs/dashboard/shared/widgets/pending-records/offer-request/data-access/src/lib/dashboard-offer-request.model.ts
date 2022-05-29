import { Expose } from 'class-transformer';

import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';

export interface DashboardOfferRequestDto {
    id: number;
    affiliate_id: number;
    affiliate_name: string;
    answer: string;
    created: number;
    updated: number;
    offer_id: number;
    offer_name: string;
    status: OfferRequestStatusEnum;
    additional_info: string;
    questions: string;
}

export class DashboardOfferRequestModel {
    @Expose()
    id: number = undefined;

    @Expose()
    offer_id: number;

    @Expose()
    offer_name: string;

    @Expose()
    affiliate_id: number;

    @Expose()
    affiliate_name: string;

    @Expose()
    status: OfferRequestStatusEnum;

    @Expose()
    additional_info: string;

    @Expose()
    questions: string;

    @Expose()
    answer: string;

    @Expose()
    created: number;
}
