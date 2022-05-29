import { Expose, Transform } from 'class-transformer';

import {
    BaseObjectModel,
    DateRangeRequestModel,
    PageRequestModel,
    SearchRequestModel,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { AdjustmentsStatusesIdEnum, AdjustmentsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

// export interface AdjustmentsInterface {
//     id: number;
//     action_id: number;
//     details: any;
//     conditions: any;
//     parameters: any;
//     notes: string;
//     status: number;
//     fire_affiliate_postback: number;
//     affected: number;
//     added_date: string;
//     added_timestamp: string;
//     change_date?: number;
//     filename?: string;
//     source_file?: File;
// }
//
// export interface AdjustmentsRequestModel extends AdjustmentsInterface {
//     details: string;
//     conditions: string;
//     parameters: string;
// }

export interface AdjustmentListDto {
    action_id: number;
    added_date: string;
    added_timestamp: string;
    affected: number;
    conditions: string;
    details: string;
    filename: string;
    fire_affiliate_postback: string;
    id: number;
    notes: string;
    parameters: string;
    state: number;
    status: number;
}

export class AdjustmentListModel {
    @Expose()
    action_id: number = undefined;

    @Expose()
    added_date: string = undefined;

    @Expose()
    added_timestamp: string = undefined;

    @Expose()
    affected: number = undefined;

    @Expose()
    @Transform(({ value }) => convertConditionsForList(value), { toClassOnly: true })
    conditions: AdjustmentLIstConditionsModel[] = [];

    @Expose()
    @Transform(({ value }) => convertDetails(value), { toClassOnly: true })
    details: AdjustmentListDetailsModel = undefined;

    // @Expose()
    // filename: string = undefined;

    @Expose()
    fire_affiliate_postback: number = undefined;

    @Expose()
    id: number = undefined;

    @Expose()
    notes: string = undefined;

    @Expose()
    get parameters(): AdjustmentListParametersModel {
        return this.details;
    }

    @Expose()
    state: number = undefined;

    @Expose()
    status: AdjustmentsStatusesIdEnum;
}

export type AdjustmentKeyType =
    | 'new_payout'
    | 'new_revenue'
    | 'new_status'
    | 'conversions_status'
    | 'conversion_status'
    | 'new_date'
    | 'dates_range'
    | 'offer'
    | 'goals'
    | 'affiliate'
    | 'fire_affiliate_postback';

// TODO create model and remove any
export interface AdjustmentListDetailsModel {
    key: AdjustmentKeyType;
    value: string | number | BaseObjectModel;
}

// TODO create model and remove any
export interface AdjustmentListParametersModel {}

export interface AdjustmentLIstConditionsModel {
    key: string;
    value?: any;
    dates_range?: {
        from?: string;
        to?: string;
    };
}

export interface AdjustmentLIstQueryParamsModel
    extends PageRequestModel,
        SortRequestModel,
        StatusRequestModel<AdjustmentsStatusesNameEnum | string>,
        SearchRequestModel,
        DateRangeRequestModel {}

const convertConditionsForList = (conditions: any | string): AdjustmentLIstConditionsModel[] => {
    const conds: any[] = Util.jsonParse(conditions, []);
    const haveGoal = conds.filter((item) => Object.keys(item)[2] === 'goal');

    if (haveGoal.length > 0) {
        const indexOffer = conds.findIndex((item) => Object.keys(item)[1] === 'offer');
        const goal = {
            key: 'goal',
            value: haveGoal[0]['goal']
        };

        conds.splice(indexOffer + 1, 0, goal);
    }
    return conds.map((item) => ({
        ...item,
        value: item[Object.keys(item)[1]]
    }));
};

const convertDetails = (originalDetail: string): AdjustmentListDetailsModel[] => {
    const details = Util.jsonParse(originalDetail, {});

    // TODO remove after fix backend
    if (typeof details === 'object') {
        return (
            Object.entries(details).map(([key, value]) => ({
                key,
                value
            })) as AdjustmentListDetailsModel[]
        ).map((item) => {
            if (item.key === 'affiliate') {
                if (typeof item.value === 'object') {
                    return {
                        ...item,
                        value: {
                            ...item.value,
                            title: item?.value?.['company'] ? item?.value?.['company'] : item?.value?.['title']
                        }
                    };
                } else {
                    return {
                        ...item,
                        value: {
                            id: item.value,
                            title: 'Affiliate'
                        }
                    };
                }
            } else {
                return item;
            }
            return item;
        }) as AdjustmentListDetailsModel[];
    }

    return [];
};
