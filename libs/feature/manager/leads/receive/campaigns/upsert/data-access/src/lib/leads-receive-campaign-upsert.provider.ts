import { Provider } from '@angular/core';

import { LeadsReceiveCampaignUpsertApi } from './leads-receive-campaign-upsert.api';
import { LeadsReceiveCampaignUpsertService } from './leads-receive-campaign-upsert.service';

export const LEADS_RECEIVE_CAMPAIGN_UPSERT_PROVIDER: Provider[] = [LeadsReceiveCampaignUpsertApi, LeadsReceiveCampaignUpsertService];
