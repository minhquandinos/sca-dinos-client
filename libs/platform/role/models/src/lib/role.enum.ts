// export enum RoleEnum {
//     Admin = 'ADMIN',
//     Manager = 'MANAGER',
//     LimitedAffiliateManager = 'LIMITED-AFFILIATE-MANAGER',
//     LimitedAdvertiserManager = 'LIMITED-ADVERTISER-MANAGER',
//     Affiliate = 'AFFILIATE',
//     Advertiser = 'ADVERTISER'
// }

export enum DefaultRoleEnum {
    Admin = 'admin',
    Manager = 'manager',
    AffiliateManager = 'affiliate-manager',
    AdvertiserManager = 'advertiser-manager',
    Financial = 'financial-manager',
    Affiliate = 'affiliate',
    Advertiser = 'advertiser'
}

export const BASE_ROLE = {
    admin: 'base_admin',
    manager: 'base_manager',
    affiliateManager: 'base_affiliate-manager',
    advertiserManager: 'base_advertiser-manager',
    affiliate: 'base_affiliate',
    advertiser: 'base_advertiser'
} as const;

export type BaseRoleType = typeof BASE_ROLE[keyof typeof BASE_ROLE];
