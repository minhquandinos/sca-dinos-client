import { Provider } from '@angular/core';

import { ManagerAdjustmentUpsertApi } from './manager-adjustment-upsert.api';
import { ManagerAdjustmentUpsertService } from './manager-adjustment-upsert.service';

export const MANAGER_ADJUSTMENT_UPSERT_PROVIDER: Provider[] = [ManagerAdjustmentUpsertApi, ManagerAdjustmentUpsertService];
