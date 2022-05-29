import { Expose, Transform } from 'class-transformer';

export interface DashboardPendingPostbackDto {
    id: number;
    level: string;
    conversion_status: number;
    type: string;
    created: number;
    updated: number;
    offer_id: number;
    offer_name: string;
    affiliate_id: number;
    affiliate_name: string;
    goal_id: number;
    goal_name: string;
}

export class DashboardPendingPostbackModel {
    @Expose()
    id: number = undefined;

    @Expose()
    @Transform(({ value }) => value?.toLowerCase() || undefined, { toClassOnly: true })
    level: string;

    @Expose()
    conversion_status: number;

    @Expose()
    type: string;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    created: number;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    updated: number;

    @Expose()
    offer_id: number;

    @Expose()
    offer_name: string;

    @Expose()
    affiliate_id: number;

    @Expose()
    affiliate_name: string;

    @Expose()
    goal_id: number;

    @Expose()
    goal_name: string;
}
