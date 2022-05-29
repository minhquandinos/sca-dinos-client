import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';

export interface FindPlatformStatusesFirstElementModel extends Pick<PlatformListsFormatInterface, 'title'> {
    id?: unknown;
    [key: string]: unknown;
}
