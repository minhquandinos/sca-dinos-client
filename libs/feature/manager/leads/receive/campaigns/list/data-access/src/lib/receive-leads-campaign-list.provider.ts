import { Provider } from '@angular/core';

import { ReceiveLeadsCampaignsApi } from './api/receive-leads-campaigns.api';
import { ReceiveLeadsCampaignListQuery } from './state/receive-leads-campaign-list.query';
import { ReceiveLeadsCampaignListService } from './state/receive-leads-campaign-list.service';
import { ReceiveLeadsCampaignListStore } from './state/receive-leads-campaign-list.store';

export const RECEIVE_LEADS_CAMPAIGN_LIST_PROVIDER: Provider[] = [
    ReceiveLeadsCampaignsApi,
    ReceiveLeadsCampaignListQuery,
    ReceiveLeadsCampaignListStore,
    ReceiveLeadsCampaignListService
];
