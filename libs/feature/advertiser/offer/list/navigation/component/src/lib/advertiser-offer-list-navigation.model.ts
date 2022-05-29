import { PlatformCountsInterface, PlatformCountsOfferModel } from '@scaleo/platform/counts/data-access';

export interface AdvertiserOfferListNavigationModel extends Pick<PlatformCountsInterface, 'offers'> {
    offers: Pick<PlatformCountsOfferModel, 'total'>;
}
