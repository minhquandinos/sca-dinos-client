import { Provider } from '@angular/core';

import { TeammateUpsertApi } from './teammate-upsert.api';
import { TeammateUpsertService } from './teammate-upsert.service';

export const TEAMMATE_UPSERT_PROVIDER: Provider[] = [TeammateUpsertApi, TeammateUpsertService];
