export type ExtendedValuesType = ExtendedAffiliateSourceInterface | ExtendedOffersItemInterface;

interface BaseExtendedFilter {
    id: number;
    title: string;
}

export interface ExtendedAffiliateSourceInterface extends BaseExtendedFilter {
    affiliate_id: number;
    affiliate_name: string;
}

export interface ExtendedOffersItemInterface extends BaseExtendedFilter {
    offer_id: number;
    offer_name: string;
    type: number;
}
