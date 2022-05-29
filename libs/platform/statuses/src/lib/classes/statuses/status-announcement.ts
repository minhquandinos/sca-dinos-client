import {
    ANNOUNCEMENT_STATUS_COLOR_MAP,
    ANNOUNCEMENT_STATUS_TRANSLATE_MAP,
    AnnouncementStatusIdEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusAnnouncement implements StatusInterface {
    constructor(private readonly status: AnnouncementStatusIdEnum) {}

    makeColor(): string {
        return ANNOUNCEMENT_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = ANNOUNCEMENT_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
