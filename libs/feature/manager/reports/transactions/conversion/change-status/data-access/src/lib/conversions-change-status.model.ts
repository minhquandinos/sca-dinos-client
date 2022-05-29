import { BooleanEnum, DateRangeRequestModel } from '@scaleo/core/data';
import { PlatformConversionStatusValueType } from '@scaleo/platform/list/access-data';

export interface ManagerConversionsChangeStatusPayloadParamsModel extends DateRangeRequestModel {
    new_status: PlatformConversionStatusValueType;
    filters: {
        transactions: string;
    };
    fire_postbacks?: BooleanEnum;
}
