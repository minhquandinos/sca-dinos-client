import { OffersTargetingRulesNameEnum } from '../../../../../../platform/list/access-data/src/lib/enums/platform-list/offers-targeting-rules.enum';

const path = `offers_page.targeting.offers_targeting_rules`;

export const OFFER_TARGETING_MAP: {
    [T in OffersTargetingRulesNameEnum]: {
        icon: string;
        translate: string;
    };
} = {
    [OffersTargetingRulesNameEnum.ConnectionType]: {
        icon: 'offer_targeting_connection',
        translate: `${path}.connection_type`
    },
    [OffersTargetingRulesNameEnum.MobileOperator]: {
        icon: 'offer_targeting_operator',
        translate: `${path}.mobile_operator`
    },
    [OffersTargetingRulesNameEnum.DeviceType]: {
        icon: 'offer_targeting_device',
        translate: `${path}.device_type`
    },
    [OffersTargetingRulesNameEnum.DeviceOS]: {
        icon: 'offer_targeting_device',
        translate: `${path}.device_os`
    },
    [OffersTargetingRulesNameEnum.DeviceOSVersion]: {
        icon: 'offer_targeting_device',
        translate: `${path}.device_os_version`
    },
    [OffersTargetingRulesNameEnum.DeviceBrand]: {
        icon: 'offer_targeting_device',
        translate: `${path}.device_brand`
    },
    [OffersTargetingRulesNameEnum.DeviceModel]: {
        icon: 'offer_targeting_device',
        translate: `${path}.device_model`
    },
    [OffersTargetingRulesNameEnum.Browser]: {
        icon: 'offer_targeting_browser',
        translate: `${path}.browser`
    },
    [OffersTargetingRulesNameEnum.Language]: {
        icon: 'offer_targeting_lang',
        translate: `${path}.language`
    },
    [OffersTargetingRulesNameEnum.Geo]: {
        icon: 'offer_targeting_geo',
        translate: `${path}.geo`
    }
};
