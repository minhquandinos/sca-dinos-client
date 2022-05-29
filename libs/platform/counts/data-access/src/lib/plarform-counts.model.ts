export interface PlatformCountsEntityInterface {
    total?: number;
    assigned?: number;
    pending: number;
    premium?: number;
    featured?: number;
    requested?: number;
    my?: number;
    smartlink?: number;
}

export interface PlatformCountsOfferModel {
    featured?: number;
    'pending-requests'?: number;
    requested?: number;
    smartlink?: number;
    total?: number;
}

export interface PlatformCountsAffiliateModel {
    assigned?: number;
    pending?: number;
    'pending-postbacks'?: number;
    premium?: number;
    total?: number;
}

export interface PlatformCountsAdvertiserModel {
    assigned?: number;
    pending?: number;
    total?: number;
}

export enum PlatformCountsEnum {
    Total = 'total',
    Assigned = 'assigned',
    Pending = 'pending',
    Premium = 'premium',
    Featured = 'featured',
    Requested = 'requested',
    My = 'my',
    SmartLink = 'smartlink'
}

export interface PlatformCountsInterface {
    advertisers?: PlatformCountsAdvertiserModel;
    affiliates?: PlatformCountsAffiliateModel;
    offers?: PlatformCountsOfferModel;
    'postbacks-count'?: {
        domains: number;
        postbacks: number;
        sources: number;
    };
    'requested-count'?: PlatformCountsEntityInterface;
}
