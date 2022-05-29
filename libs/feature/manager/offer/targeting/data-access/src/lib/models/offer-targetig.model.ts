export interface OfferTargetingInterface {
    gt_included_ids: any;
    gt_excluded_ids: any;
    extended_targeting: any;
    gt_included_selected: any;
    gt_excluded_selected: any;
    strict_targeting: number;
}

export interface OfferTargetingDefaultItemsInterface {
    id: number;
    title: string;
}

export interface OfferTargetingDefaultMobileOperatorsInterface extends OfferTargetingDefaultItemsInterface {
    country: string;
}

export interface OfferTargetingLanguageItems extends OfferTargetingDefaultItemsInterface {
    title_ru: string;
    title_en: string;
    locale: string;
}
