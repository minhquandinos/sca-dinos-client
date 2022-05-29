import { Provider } from '@angular/core';

import { AnnouncementUpsertApi } from './announcement-upsert.api';
import { AnnouncementUpsertService } from './announcement-upsert.service';

export const ANNOUNCEMENT_UPSERT_PROVIDER: Provider[] = [AnnouncementUpsertApi, AnnouncementUpsertService];
