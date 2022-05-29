import { OfferTrafficDistributionMethodEnum } from '../enum/offer-traffic-distribution.enum';
import { OfferTrafficDistributionABTestingModel } from './offer-traffic-distribution-ab-testing';

export interface OfferTrafficDistributionItemsControlDto {
    landing_page: number;
    distribution: number | string;
}

export interface OfferTrafficDistributionModel {
    method: OfferTrafficDistributionMethodEnum;
    items?: OfferTrafficDistributionABTestingModel[];
}

export interface OfferTrafficDistributionMethodPayloadDto {
    traffic_distribution_method: OfferTrafficDistributionMethodEnum;
}
