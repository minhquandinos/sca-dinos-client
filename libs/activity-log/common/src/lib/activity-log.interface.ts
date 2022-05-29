import { LangRequestModel, PageRequestModel, SortRequestModel } from '@scaleo/core/data';

import { ActivityObjectTypeEnum } from './enums/activity-log.enum';

export interface ActivityLogInterface {
    id: string;
    added_timestamp: number;
    activity: {
        object_id: number;
        object_type: ActivityObjectTypeEnum;
        action_id: number;
        action_title: string;
        action_message: string;
        old_values: string;
        new_values: string;
        object_name: string;
        owner_id?: number;
        owner_type?: string;
        owner_name?: string;
        target_id?: number;
        target_type?: string;
        target_name?: string;
    };
    user: {
        id: number;
        name: string;
        role: string;
        ip: string;
        country_code: string;
        country?: string;
        region?: string;
        city?: string;
        image?: string;
    };
}

export interface ActivityLogRequestModel extends SortRequestModel, PageRequestModel, LangRequestModel {
    affiliate?: string | number;
    offer?: string | number;
    advertiser?: string | number;
    managers?: string;
    role?: string;
}
