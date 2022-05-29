import { CustomParamsActionIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferCustomParametersInterface {
    id?: number;
    offer_id: number;
    status: number;
    affiliates: string | number[];
    start_date: string;
    end_date: string;
    conditions?: any | OfferCustomParametersConditionsInterface[];
    parameters?: any | OfferCustomParametersParametersInterface[];
    created?: number;
    updated?: number;
    affiliates_selected?: any | OfferCustomParametersAffiliatesInterface[];
    affiliates_mixed?: number;
}

export interface OfferCustomParametersConditionsInterface {
    type: number;
    permission: number;
    conditions: any;
    permission_color?: string;
}

export interface OfferCustomParametersParametersInterface {
    type: CustomParamsActionIdEnum;
    cap_type: number;
    goal_id: number | any;
    parameter: string;
}

export interface OfferCustomParametersAffiliatesInterface {
    company_name: string;
    id: number;
    firstname: string;
    lastname: string;
}

/*
 * @deprecated Please use CustomParamsActionIdEnum
 * */
export enum OffersParametersEnum {
    Revenue = 1,
    Payout = 2,
    DailyCap = 3,
    WeeklyCap = 4,
    MonthlyCap = 5,
    TotalCap = 6,
    ThrottleRatePending = 7,
    ThrottleRateRejected = 8,
    TrafficBackURL = 9,
    ForceRedirect = 10,
    TrafficBackOffer = 11
}
