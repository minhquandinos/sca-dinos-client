import { OfferVisibilityModel, OfferVisibilityRequestStatusIdEnum } from '@scaleo/offer/common';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export class OfferVisibilityUtil {
    static checkOfferRequestStatus(visibility: OfferVisibilityModel[]): boolean {
        const [firstVisibility] = visibility;
        if (firstVisibility.id === OffersVisibilityIdEnum.Require && firstVisibility.requests.length > 0) {
            return firstVisibility.requests.some((request) => OfferVisibilityRequestStatusIdEnum.Active === +request.status);
        }

        return !(firstVisibility.id === OffersVisibilityIdEnum.Require && firstVisibility.requests.length <= 0);
    }
}
