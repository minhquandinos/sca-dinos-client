export const PLATFORM_PLAN = {
    standart: 'standart',
    professional: 'professional',
    enterprise: 'enterprise',
    custom: 'custom'
} as const;

export type PlanType = typeof PLATFORM_PLAN[keyof typeof PLATFORM_PLAN];
