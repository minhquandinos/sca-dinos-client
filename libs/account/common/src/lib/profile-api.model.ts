export const PROFILE_API_STATUS = {
    enabled: 1,
    disabled: 2
} as const;

export type ProfileApiStatusType = typeof PROFILE_API_STATUS[keyof typeof PROFILE_API_STATUS];
