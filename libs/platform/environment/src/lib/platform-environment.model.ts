export interface PlatformEnvironmentModel {
    serverUrl: string | undefined;
    buildVersion: string;
    advertiserMock: boolean;
    advertiser_api_link: string;
    affiliate_api_link: string;
    affiliate_postback_limitations_link: string;
    manager_api_link: string;
    tracking_optional_parameters: string;
    settings_available_tokens: string;
    affiliate_postback_available_tokens: string;
}
