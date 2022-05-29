export interface SettingsBrandingModel {
    // changed from PlarformAdministrationBrandingInterface
    network_name: string;
    logo: string;
    favicon: string;
    main_color: string;
    links_color: string;
    company_website_url: string;
    privacy_policy_url: string;
    terms_and_conditions_url: string;
    login_page_theme_id: number;
    set_theme_automatically: string;
    client_custom_code: string;
    favicon_image_data?: string;
    logo_image_data?: string;
}

export type SettingsBrandingImageType = 'logo' | 'favicon';
