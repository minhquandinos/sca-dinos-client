import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

export interface BasicListsAdministrationInterface {
    id: number;
    title: string;
    status: number;
    sort: number;
    iconName?: string;
}

export interface RelationMessengersInterface {
    type: number;
    account: string;
    title: string;
}

export const excludePlatformStatus = [PlatformListsStatusesEnum.Pending];
