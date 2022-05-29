import { PlatformEnvironmentModel } from './platform-environment.model';

export const PLATFORM_ENVIRONMENT_DEV: PlatformEnvironmentModel = {
    serverUrl: 'https://scaleo-server.loc',
    buildVersion: '3.0',
    advertiserMock: true,
    advertiser_api_link: 'https://developers.scaleo.io/#9eebf88d-d1d5-4af4-a051-0752d087caeb',
    affiliate_api_link: 'https://developers.scaleo.io/#98193d9b-0d18-4c7d-8952-e8bfb6a8554f',
    affiliate_postback_limitations_link: 'https://scaleo.zendesk.com/hc/en-us/categories/360000163238-API-for-Affiliates',
    manager_api_link: 'https://developers.scaleo.io/#31b62b58-5404-4c4c-8114-b6ea9bc405f9',
    tracking_optional_parameters: '{affiliate_id}, {offer_id}, {sub_id1} - {sub_id5}',
    settings_available_tokens: '{affiliate_id}, {offer_id}, {sub_id1} - {sub_id5}',
    affiliate_postback_available_tokens: '{affiliate_id}, {offer_id}, {sub_id1} - {sub_id5}'
} as const;
