import { Provider } from '@angular/core';

import { LeadsLogsApi } from './api/leads-logs.api';
import { LeadsLogsQuery } from './state/leads-logs.query';
import { LeadsLogsService } from './state/leads-logs.service';
import { LeadsLogsStore } from './state/leads-logs.store';

export const LEADS_LOGS_PROVIDER: Provider[] = [LeadsLogsStore, LeadsLogsApi, LeadsLogsQuery, LeadsLogsService];
