interface OfferConfigTotalModel {
    total: number;
}

export interface OfferConfigCountsDto {
    goals?: OfferConfigTotalModel;
    'offer-urls'?: OfferConfigTotalModel;
    creatives?: OfferConfigTotalModel;
    'custom-params'?: OfferConfigTotalModel;
    activity_logs?: OfferConfigTotalModel;
}

export interface OfferConfigCountsModel {
    goals?: number;
    offer_urls?: number;
    creatives?: number;
    custom_params?: number;
    activity_logs?: number;
}
