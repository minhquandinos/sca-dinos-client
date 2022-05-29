import { GeoIpModel } from '@scaleo/shared/data-access';

import {
    OfferTargetingDefaultItemsInterface,
    OfferTargetingDefaultMobileOperatorsInterface,
    OfferTargetingLanguageItems
} from '../../../../../../../../../../feature/manager/offer/targeting/data-access/src/lib/models/offer-targetig.model';
import {
    PlatformListsBaseInterface,
    PlatformListsFormatInterface
} from '../../../../../../../../../../platform/list/access-data/src/lib/models/platform.lists.interface';

export type ReportFiltersSelectedDefaultSelectValueType =
    | PlatformListsFormatInterface
    | PlatformListsBaseInterface
    | GeoIpModel
    | OfferTargetingDefaultItemsInterface
    | OfferTargetingDefaultMobileOperatorsInterface
    | OfferTargetingLanguageItems;
