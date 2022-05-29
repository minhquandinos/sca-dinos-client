// import { PlatformListAffiliateVisibilityModel } from '@state/platform-list/platform-list.model';

import {
    AffiliateVisibilityIdEnum,
    AffiliateVisibilityNameEnum,
    AffiliateVisibilityTranslateEnum
} from '../../enums/platform-list/affiliate-visibility.enum';
import { PlatformListAffiliateVisibilityModel } from '../../models/platform-list.model';

export const AFFILIATE_VISIBILITY_TRANSLATE_MAP = Object.freeze({
    [AffiliateVisibilityIdEnum.Public]: AffiliateVisibilityTranslateEnum.Public,
    [AffiliateVisibilityIdEnum.RequireApproval]: AffiliateVisibilityTranslateEnum.RequireApproval,
    [AffiliateVisibilityIdEnum.Private]: AffiliateVisibilityTranslateEnum.Private
});

export const AFFILIATE_VISIBILITY_MAP: PlatformListAffiliateVisibilityModel[] = [
    {
        id: AffiliateVisibilityIdEnum.Public,
        title: 'Public',
        key: AffiliateVisibilityNameEnum.Public
    },
    {
        id: AffiliateVisibilityIdEnum.RequireApproval,
        title: 'Require Approval',
        key: AffiliateVisibilityNameEnum.RequireApproval
    },
    {
        id: AffiliateVisibilityIdEnum.Private,
        title: 'Private',
        key: AffiliateVisibilityNameEnum.Private
    }
];
