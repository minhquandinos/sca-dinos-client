export interface OfferTargetingEditPayloadDto {
    gt_included_ids: string;
    gt_excluded_ids: string;
    extended_targeting: string;
    strict_targeting: number;
}

export interface OfferTargetingEditFormControlDto {
    gt_included_ids: number[];
    gt_excluded_ids: number[];
    extended_targeting: number[];
    strict_targeting: boolean;
}
