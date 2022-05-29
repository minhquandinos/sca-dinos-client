export const DEFAULT_IMAGE = {
    payment: 'payment',
    manager: 'manager',
    offer: 'offer',
    affiliate: 'affiliate',
    advertiser: 'advertiser'
} as const;

export type DefaultImageType = keyof typeof DEFAULT_IMAGE;

const t: DefaultImageType = DEFAULT_IMAGE.manager;
