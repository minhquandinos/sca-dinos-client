import { GeoTargetingOfferProfile } from '../offer';

export interface OfferViewTargetingModel {
    geo: {
        allowed: string;
        denied: string;
    };
}

// geo?: GeoTargetingOfferProfile;
// connectionType?: GeoTargetingOfferProfile;
// mobileOperator?: GeoTargetingOfferProfile;
// deviceType?: GeoTargetingOfferProfile;
// deviceOs?: GeoTargetingOfferProfile;
// deviceOsVersion?: GeoTargetingOfferProfile;
// deviceBrand?: GeoTargetingOfferProfile;
// deviceModel?: GeoTargetingOfferProfile;
// browser?: GeoTargetingOfferProfile;
// language?: GeoTargetingOfferProfile;
