import { Provider } from '@angular/core';

import { AnnouncementListApi } from './api/announcement-list.api';
import { AnnouncementListQuery } from './state/announcement-list.query';
import { AnnouncementListService } from './state/announcement-list.service';
import { AnnouncementListStore } from './state/announcement-list.store';

export const MANAGER_ANNOUNCEMENT_LIST_PROVIDER: Provider[] = [
    AnnouncementListApi,
    AnnouncementListStore,
    AnnouncementListService,
    AnnouncementListQuery
];
