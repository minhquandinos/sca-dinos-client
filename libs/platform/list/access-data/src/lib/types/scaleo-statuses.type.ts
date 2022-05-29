import { ScaleoStatusEnum } from '@scaleo/platform/list/access-data';

export type ScaleoStatusesType = keyof Record<ScaleoStatusEnum, string>;
