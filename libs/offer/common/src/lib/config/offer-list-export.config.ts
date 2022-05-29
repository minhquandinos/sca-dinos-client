import { getConfig } from '@scaleo/utils';

const columns =
    'id,title,status,advertiser_id,description,internal_info,url,preview,tags,currency,expiration_date,updated,created,goal_id,goal_name,goal_type,goal_revenue,goal_payout,goal_caps,goal_multiple_conversions,goal_status,goal_1_id,goal_1_name,goal_1_type,goal_1_revenue,goal_1_payout,goal_1_caps,goal_1_multiple_conversions,goal_1_status,goal_2_id,goal_2_name,goal_2_type,goal_2_revenue,goal_2_payout,goal_2_caps,goal_2_multiple_conversions,goal_2_status,targeting';

export const allOfferColumnsForExport = getConfig<string>(columns);
