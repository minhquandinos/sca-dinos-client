import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { CustomParamsActionIdEnum } from '@scaleo/platform/list/access-data';
import { ArrayUtil } from '@scaleo/utils';

export interface OfferCustomParametersFormControlModel {
    id: number;
    status: number;
    affiliates: number[];
    start_date: string;
    end_date?: string;
    conditions: OfferCustomParametersConditionsModel[];
    parameters: OfferCustomParametersParametersModel[];
    affiliates_selected: OfferCustomParametersAffiliatesModel[];
}

export class OfferCustomParameterCreateDto {
    @Expose()
    id: number = undefined;

    @Expose()
    status: number = undefined;

    @Expose()
    affiliates_mixed: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    affiliates: string = undefined;

    @Expose()
    start_date: string = undefined;

    @Expose()
    end_date: string = undefined;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    conditions: string = undefined;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    parameters: string = undefined;
}

interface OfferCustomParametersConditionsModel {
    type: number;
    permission: number;
    conditions: any;
    permission_color?: string;
}

interface OfferCustomParametersParametersModel {
    type: CustomParamsActionIdEnum;
    cap_type: number;
    goal_id: number | any;
    parameter: string;
}

interface OfferCustomParametersAffiliatesModel {
    company_name: string;
    id: number;
    firstname: string;
    lastname: string;
}
