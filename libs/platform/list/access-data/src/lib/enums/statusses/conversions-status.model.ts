export const CONVERSION_STATUSES_ID = {
    approved: 2,
    pending: 3,
    rejected: 4,
    trash: 5
} as const;

export const CONVERSION_STATUSES_NAME = {
    approved: 'approved',
    pending: 'pending',
    rejected: 'rejected',
    trash: 'trash'
} as const;

export const CONVERSION_STATUSES_TRANSLATE = {
    approved: 'conversion_statuses.approved',
    pending: 'conversion_statuses.pending',
    rejected: 'conversion_statuses.rejected',
    trash: 'conversion_statuses.trash'
} as const;

export type PlatformConversionStatusType = typeof CONVERSION_STATUSES_ID;

export type PlatformConversionStatusNameType = typeof CONVERSION_STATUSES_NAME;

export type PlatformConversionStatusValueType = PlatformConversionStatusType[keyof typeof CONVERSION_STATUSES_ID];

export type PlatformConversionStatusNameValueType = PlatformConversionStatusNameType[keyof typeof CONVERSION_STATUSES_NAME];
