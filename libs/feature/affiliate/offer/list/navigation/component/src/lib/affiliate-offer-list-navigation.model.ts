import { PlatformCountsInterface, PlatformCountsOfferModel } from '@scaleo/platform/counts/data-access';

export interface AffiliateOfferListNavigationModel extends Pick<PlatformCountsInterface, 'offers'> {
    offers: PlatformCountsOfferModel & {
        my: number;
    };
}
