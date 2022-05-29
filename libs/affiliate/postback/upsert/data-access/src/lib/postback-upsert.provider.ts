import { Provider } from '@angular/core';

import { PostbackUpsertApi } from './postback-upsert.api';
import { PostbackUpsertService } from './postback-upsert.service';

export const POSTBACK_UPSERT_PROVIDER: Provider[] = [PostbackUpsertApi, PostbackUpsertService];
