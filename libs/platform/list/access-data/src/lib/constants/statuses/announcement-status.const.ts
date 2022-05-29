import { BaseObjectModel } from '@scaleo/core/data';

import {
    AnnouncementStatusIdEnum,
    AnnouncementStatusNameEnum,
    AnnouncementStatusTranslateEnum
} from '../../enums/statusses/announcement-status.enum';
import { ScaleoStatusColorEnum } from '../../enums/statusses/scaleo-status.enum';
import { PlatformListStatusModel } from '../../models/platform-list.model';

export const ANNOUNCEMENT_STATUS_TRANSLATE_MAP: BaseObjectModel = Object.freeze({
    [AnnouncementStatusIdEnum.Active]: AnnouncementStatusTranslateEnum.Active,
    [AnnouncementStatusIdEnum.Draft]: AnnouncementStatusTranslateEnum.Draft,
    [AnnouncementStatusIdEnum.Inactive]: AnnouncementStatusTranslateEnum.Inactive
});

export const ANNOUNCEMENT_STATUS_COLOR_MAP: BaseObjectModel = Object.freeze({
    [AnnouncementStatusIdEnum.Active]: ScaleoStatusColorEnum.Green,
    [AnnouncementStatusIdEnum.Draft]: ScaleoStatusColorEnum.Orange,
    [AnnouncementStatusIdEnum.Inactive]: ScaleoStatusColorEnum.Red
});

export const ANNOUNCEMENT_STATUS_MAP: PlatformListStatusModel[] = [
    {
        id: AnnouncementStatusIdEnum.Active,
        status: AnnouncementStatusNameEnum.Active,
        title: AnnouncementStatusNameEnum.Active
    },
    {
        id: AnnouncementStatusIdEnum.Draft,
        status: AnnouncementStatusNameEnum.Draft,
        title: AnnouncementStatusNameEnum.Draft
    },
    {
        id: AnnouncementStatusIdEnum.Inactive,
        status: AnnouncementStatusNameEnum.Inactive,
        title: AnnouncementStatusNameEnum.Inactive
    }
];
