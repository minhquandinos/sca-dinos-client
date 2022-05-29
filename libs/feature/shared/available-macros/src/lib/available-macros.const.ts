import { AvailableMacrosType } from './available-macros.type';

export const availableMacros = (() => {
    const setMacroses = (type: AvailableMacrosType) => {
        switch (type) {
            case 'global_trafficback':
                return mapMacrosesForGlobalTrafficback;
            case 'postback':
                return mapMacrosesForPostback;
            case 'announcement':
                return mapMacrosesForAnnouncement;
            case 'email_template':
                return mapMacrosesForEmailTemplate;
            case 'goals':
            case 'tracking-goals':
                return mapMacrosesForGoals;
            case 'posting_instructions':
                return mapMacrosesForPostingInstructions;
            case 'impressions_url':
                return mapMacrosesForImpressionsUrl;
            case 'url':
            default:
                return mapMacrosesForUrl;
        }
    };

    const setUrl = (type: AvailableMacrosType, url?: string) => {
        switch (type) {
            case 'global_trafficback':
                return exampleUrlsForGlobalTrafficback.map((item) => item.replace('[trafficback_url]', url));
            case 'postback':
                return exampleUrlsForPostback;
            case 'announcement':
            case 'email_template':
            case 'posting_instructions':
            case 'impressions_url':
                return [];
            case 'goals':
                return exampleUrlsForGoals.map((item) => item.replace('[offer_tracking_domain]', url));
            case 'tracking-goals':
                return exampleUrlsForTrackingGoals.map((item) => item.replace('[offer_tracking_domain]', url));
            case 'url':
            default:
                return exampleUrlsForUrl;
        }
    };

    return {
        setMacroses,
        setUrl
    };
})();

const mapMacrosesForUrl: string[] = [
    'click_id',
    'offer_id',
    'affiliate_id',
    'sub_id1',
    'sub_id2',
    'sub_id3',
    'sub_id4',
    'sub_id5',
    'aff_param1',
    'aff_param2',
    'aff_param3',
    'aff_param4',
    'aff_param5',
    'link_id',
    'creative_id',
    'offer_name',
    'idfa',
    'gaid'
];

const exampleUrlsForUrl: string[] = [
    'https://www.brand.com?oid={offer_id}&company={offer_name}',
    'https://www.brand.com?link={link_id}&creative={creative_id}',
    'https://www.brand.com?oid={offer_id}&sub={sub_id1}&info={aff_param1}',
    'https://www.brand.com?company={offer_name}&custom_info={aff_param1}_{aff_param2}_{aff_param3}'
];

const mapMacrosesForGlobalTrafficback: string[] = [
    'affiliate_id',
    'offer_id',
    'sub_id1',
    'sub_id2',
    'sub_id3',
    'sub_id4',
    'sub_id5',
    'idfa',
    'gaid'
];

const exampleUrlsForGlobalTrafficback: string[] = [
    '[trafficback_url]?from_offer={offer_id}',
    '[trafficback_url]?oid={offer_id}&aid={affiliate_id}',
    '[trafficback_url]?subs={sub_id1}_{sub_id2}_{sub_id3}&aff_id={affiliate_id}',
    '[trafficback_url]?info={affiliate_id}_{offer_id}_{sub_id1}'
];

const mapMacrosesForEmailTemplate: string[] = [
    'company_name',
    'homepage_url',
    'platform_url',
    'logo_url',
    'main_color',
    'links_color',
    'first_name',
    'last_name',
    'email',
    'unsubscribe_url'
];

const mapMacrosesForGoals: string[] = [
    'click_id',
    'goal_id',
    'amount',
    'goal_alias',
    'adv_track_id',
    'adv_order_id',
    'adv_user_id',
    'adv_param1',
    'adv_param2',
    'adv_param3',
    'adv_param4',
    'adv_param5',
    'idfa',
    'gaid'
];

const mapMacrosesForAnnouncement: string[] = [
    'offerID',
    'first_name',
    'last_name',
    'email',
    'company_name',
    'homepage_url',
    'platform_url',
    'logo_url',
    'unsubscribe_url'
];

const exampleUrlsForGoals: string[] = [
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&goal_id=1&adv_track_id=TrackTest',
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&goal_alias=sale&amount=120',
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&adv_order_id=122434',
    '[offer_tracking_domain]/track/goal-by-click-id?click_id=c7601cf259fbc45952352043959ef237&adv_track_id=Promo&adv_param1=Boots'
];

const exampleUrlsForTrackingGoals: string[] = [
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&adv_track_id=TrackTest',
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&amount=120',
    '[offer_tracking_domain]/track/goal-by-clicks-id?click_id=c7601cf259fbc45952352043959ef237&adv_order_id=122434',
    '[offer_tracking_domain]/track/goal-by-click-id?click_id=c7601cf259fbc45952352043959ef237&adv_track_id=Promo&adv_param1=Boots'
];

const mapMacrosesForPostback: string[] = [
    'aff_click_id',
    'offer_id',
    'affiliate_id',
    'sub_id1',
    'sub_id2',
    'sub_id3',
    'sub_id4',
    'sub_id5',
    'aff_param1',
    'aff_param2',
    'aff_param3',
    'aff_param4',
    'aff_param5',
    'link_id',
    'deep_link',
    'creative_id',
    'goal_id',
    'offer_name',
    'offer_currency',
    'adv_order_id',
    'adv_user_id',
    'adv_param1',
    'adv_param2',
    'adv_param3',
    'adv_param4',
    'adv_param5',
    'amount',
    'payout',
    'conv_status',
    'transaction_id',
    'ip',
    'user_agent',
    'device_type',
    'device_os',
    'connection_type',
    'mobile_operator',
    'geo_country_code',
    'geo_country',
    'geo_region',
    'geo_city',
    'idfa',
    'gaid'
];

const mapMacrosesForPostbackForAffilaite: string[] = [
    'offer_id',
    'affiliate_id',
    'sub_id1',
    'sub_id2',
    'sub_id3',
    'sub_id4',
    'sub_id5',
    'aff_click_id',
    'link_id',
    'deep_link',
    'goal_id',
    'adv_order_id',
    'adv_user_id',
    'track_id',
    'transaction_id',
    'aff_param1',
    'aff_param2',
    'aff_param3',
    'aff_param4',
    'aff_param5',
    'offer_name',
    'offer_currency',
    'creative_id',
    'payout',
    'ip',
    'user_agent',
    'device_type',
    'device_os',
    'connection_type',
    'mobile_operator',
    'geo_country_code',
    'geo_country',
    'geo_region',
    'geo_city',
    'idfa',
    'gaid'
];

const exampleUrlsForPostback: string[] = [
    'https://affiliate-platform.com?id={aff_click_id}&company={offer_name}&amount={offer_currency}{payout}',
    'https://affiliate-platform.com?trans={transaction_id}&identifier={aff_click_id}&creative={creative_id}&user_info={ip}_{user_agent}_{device_type}',
    'https://affiliate-platform.com?oid={offer_id}&sub={sub_id1}&geo_info={geo_country}',
    'https://affiliate-platform.com?goal={goal_id}&details={aff_param1}_{mobile_operator}_{device_type}&aff={affiliate_id}'
];

const mapMacrosesForPostingInstructions: string[] = [
    'affiliate_id',
    'offer_id',
    'goal_id',
    'click_id',
    'lead_id',
    'sub_id1',
    'sub_id2',
    'sub_id3',
    'sub_id4',
    'sub_id5',
    'aff_param1',
    'aff_param2',
    'aff_param3',
    'aff_param4',
    'aff_param5',
    'email',
    'firstname',
    'lastname',
    'address',
    'city',
    'region',
    'country',
    'postcode',
    'phone',
    'gender',
    'birthday',
    'custom1} - {custom20',
    'ip',
    'idfa',
    'gaid'
];

const mapMacrosesForImpressionsUrl: string[] = [
    'offer_id',
    'affiliate_id',
    'sub_id1} - {sub_id5',
    'aff_param1} - {aff_param5',
    'idfa',
    'gaid'
];
