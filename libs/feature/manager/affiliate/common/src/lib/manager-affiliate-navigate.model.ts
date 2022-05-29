export const MANAGER_AFFILIATE_NAVIGATE = {
    all: 'all',
    my: 'my',
    pending: 'pending'
} as const;

export type ManagerAffiliateNavigateType = keyof typeof MANAGER_AFFILIATE_NAVIGATE;
