// import { RoleEnum } from '@scaleo/platform/role/models';
//
// export class RoleUtil {
//     static all(): ReadonlyArray<RoleEnum> {
//         return [
//             RoleEnum.Admin,
//             RoleEnum.Manager,
//             RoleEnum.LimitedAffiliateManager,
//             RoleEnum.LimitedAdvertiserManager,
//             RoleEnum.Advertiser,
//             RoleEnum.Affiliate
//         ];
//     }
//
//     static managers(): ReadonlyArray<RoleEnum> {
//         return [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.LimitedAffiliateManager, RoleEnum.LimitedAdvertiserManager];
//     }
//
//     static isManagers(role: RoleEnum): boolean {
//         return RoleUtil.managers().includes(role);
//     }
//
//     static limitedManagers(): ReadonlyArray<RoleEnum> {
//         return [RoleEnum.LimitedAffiliateManager, RoleEnum.LimitedAdvertiserManager];
//     }
//
//     static isLimitedManagers(role: RoleEnum): boolean {
//         return RoleUtil.limitedManagers().includes(role);
//     }
// }
