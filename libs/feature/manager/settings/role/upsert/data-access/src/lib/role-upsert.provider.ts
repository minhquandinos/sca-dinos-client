import { Provider } from '@angular/core';

import { RoleUpsertApi } from './role-upsert.api';
import { RoleUpsertService } from './role-upsert.service';

export const ROLE_UPSERT_PROVIDER: Provider[] = [RoleUpsertApi, RoleUpsertService];
