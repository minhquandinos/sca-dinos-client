import { PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

export type ReferralQueryParamsDto = StatusRequestModel<ReferralStatusType | string> & PageRequestModel & SortRequestModel;

export type ReferralStatusType = PlatformListsStatusesEnum.Active | PlatformListsStatusesEnum.Pending | PlatformListsStatusesEnum.Inactive;

// export namespace AffiliateAccess {
//     export interface ReferralAffiliateDto {
//         created: number;
//         rate: number;
//         referral: string;
//         referral_commission: number;
//         status: ReferralStatusType;
//     }
// }
