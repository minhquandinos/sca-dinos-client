import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { CurrencyEnum, PlatformCurrencyModel } from '@scaleo/platform/currency/models';
import { PlanType, PlatformPlanFeatureUnionType } from '@scaleo/platform-permission-plan-common';
import { Util } from '@scaleo/utils';

type TariffsPlanType = { [key in PlanType]?: PlatformPlanFeatureUnionType[] };

export class PlatformSettingsModel {
    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    show_language_selection: boolean;

    @Expose()
    network_name: string = undefined;

    @Expose()
    favicon: string = undefined;

    @Expose()
    logo: string = undefined;

    @Expose()
    platform_datetime_format?: string = undefined;

    @Expose()
    links_color: string = undefined;

    @Expose()
    main_color: string = undefined;

    @Expose()
    default_language: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    aff_custom_fields?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    adv_custom_fields?: any = undefined; // TODO add type

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    aff_allow_affiliate_signup: boolean;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    adv_allow_advertiser_signup: boolean;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    aff_allow_payment_requests: boolean = undefined;

    @Expose({ name: 'aff_signup_process' })
    private _aff_signup_process: string = undefined;

    @Expose()
    get isAffSignupProcessWithoutApproval(): boolean {
        return +this._aff_signup_process === 1;
    }

    @Expose()
    get isAffSignupProcessEmailVerification(): boolean {
        return +this._aff_signup_process === 2;
    }

    @Expose()
    get isAffSignupApprovalRequired(): boolean {
        return +this._aff_signup_process === 0;
    }

    @Expose({ name: 'adv_signup_process' })
    private _adv_signup_process: string = undefined;

    @Expose()
    get isAdvSignupProcessWithoutApproval(): boolean {
        return +this._adv_signup_process === 1;
    }

    @Expose()
    get isAdvSignupProcessEmailVerification(): boolean {
        return +this._adv_signup_process === 2;
    }

    @Expose()
    get isAdvSignupApprovalRequired(): boolean {
        return +this._adv_signup_process === 0;
    }

    @Expose()
    aff_custom_signup_url: string = undefined;

    @Expose({ name: 'aff_default_managers' })
    private _aff_default_managers: any | any[];

    @Expose()
    get aff_default_managers(): unknown | number[] {
        return this._aff_default_managers?.length > 0 ? this._aff_default_managers.split(',').map((id: any) => +id) : [];
    }

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    aff_must_agree_with_privacy_policy: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    aff_must_agree_with_terms_and_conditions: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    show_the_balance_of_pending_conversions: boolean = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    invoice_type: 1 | 2 = undefined; // TODO NX AffiliateInvoiceFrequencyEnum

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    invoice_frequency: any = undefined; // TODO NX PaymentFrequencyIdEnum

    @Expose()
    information_for_affiliates: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    intercom_users_code: boolean = undefined;

    @Expose()
    intercom_client_id: string = undefined;

    @Expose()
    client_custom_code: string = undefined;

    @Expose()
    company_website_url: string = undefined;

    @Expose()
    privacy_policy_url: string = undefined;

    @Expose()
    terms_and_conditions_url: string = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    login_page_theme_id: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    set_theme_automatically: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    show_powered_by: boolean = undefined;

    @Expose()
    custom_domain: string = undefined;

    @Expose()
    client_url: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    include_rejected_in_totals: boolean = undefined;

    @Expose()
    affiliate_access_offer_custom_url: string = undefined;

    @Expose()
    get affiliate_access_offer_custom_url_is_show(): boolean {
        return !!this.include_rejected_in_totals;
    }

    @Expose()
    login_custom_url: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    leads_management_module: boolean = undefined;

    @Expose()
    bucket_path_adjustments: string = undefined;

    @Expose()
    bucket_url: string = undefined;

    @Expose()
    bucket_path_platform: string = undefined;

    @Expose()
    bucket_path_offers: string = undefined;

    @Expose()
    bucket_path_creatives: string = undefined;

    @Expose()
    bucket_path_pixels: string = undefined;

    @Expose()
    bucket_path_users: string = undefined;

    // @Expose({ name: 'aff_referral_program' })
    // @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    // affReferralProgram: boolean = undefined;

    @Expose({ name: 'aff_referral_program' })
    private _aff_referral_program: string = undefined;

    @Expose()
    get affReferralProgram(): boolean {
        return Util.numToBoolean(+this._aff_referral_program);
    }

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    aff_auto_approve_postbacks: boolean = undefined;

    @Expose()
    track_url: string = undefined;

    @Expose()
    api_url: string = undefined;

    // TODO not work without global params ignoreDecorators: true
    // @Expose({ name: 'yandex_metrika_code' })
    // @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    // yandexMetrikaCode: boolean = undefined;

    @Expose({ name: 'yandex_metrika_code' })
    private _yandex_metrika_code: string = undefined;

    @Expose()
    get yandexMetrikaCode(): boolean {
        return Util.numToBoolean(+this._yandex_metrika_code);
    }

    @Expose()
    tariff_plan: PlanType;

    // @Expose()
    // tariff_plans: TariffsPlanType = undefined;

    @Expose()
    get tariff_plans(): TariffsPlanType {
        return {
            custom: ['smartLink', 'sendEmailNotificationToUser', 'generateInvoiceAutomatically', 'customRole', 'affiliateDomains'],
            enterprise: ['smartLink', 'sendEmailNotificationToUser', 'customRole', 'affiliateDomains'],
            professional: ['smartLink', 'sendEmailNotificationToUser'],
            standart: []
        };
    }

    @Expose()
    get tariffPlan(): PlanType {
        return this.tariff_plan;
    }

    @Expose()
    get availablePlanFeatures(): string[] {
        return this.tariff_plans?.[this.tariffPlan] || [];
    }

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    affiliate_offer_show_performance: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    allow_to_enter_an_amount: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    allow_an_attachment: boolean = undefined;

    @Expose({ name: 'custom-smtp-host' })
    private _custom_smtp_host: string = undefined;

    @Expose()
    get custom_smtp_host(): string {
        return this._custom_smtp_host;
    }

    @Expose()
    platform_default_daterange: string = undefined;

    @Expose()
    referral_custom_url: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    generate_invoice_automatically: boolean = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    include_referral_balance: string = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    default_payment_terms: number = undefined;

    @Expose()
    currency: CurrencyEnum = undefined;

    @Expose()
    platform_time_zone: string = undefined;

    @Expose()
    global_trafficback_url: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    show_getting_started = false;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    adv_invite_enabled: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    aff_invite_enabled: BooleanEnum = undefined;

    @Expose()
    approval_questions_for_affiliate: string = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    ask_approval_questions_by_default: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    advertiser_token_for_postback: BooleanEnum = undefined;

    @Expose()
    mobile_app: BooleanEnum = undefined;

    @Expose()
    show_mobile_advertisers: BooleanEnum = undefined;

    @Expose()
    show_mobile_affiliates: BooleanEnum = undefined;

    @Expose()
    show_mobile_managers: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_manager: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_affiliate: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_advertiser: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    adv_required_fields?: any = undefined; // TODO add type

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    adv_optional_fields?: any = undefined; // TODO add type

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    adv_must_agree_with_privacy_policy = false;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(+value), { toClassOnly: true })
    adv_must_agree_with_terms_and_conditions = false;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    aff_required_fields?: any = undefined; // TODO add type

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    aff_optional_fields?: any = undefined; // TODO add type

    @Expose()
    @Transform(({ value }) => Util.stringToNumber(value), { toClassOnly: true })
    aff_referral_commission_type?: number = 0;

    @Expose()
    @Transform(({ value }) => Util.stringToNumber(value), { toClassOnly: true })
    aff_referral_commission?: number = 0;

    @Expose()
    @Transform(({ value }) => Util.stringToNumber(value), { toClassOnly: true })
    aff_referral_commission_source?: number = 0;

    @Expose()
    aff_referral_commission_currency?: CurrencyEnum = undefined;

    @Expose()
    currencies?: PlatformCurrencyModel[] = [];

    @Expose()
    private getting_started_stage1: string = undefined;

    @Expose()
    get gettingStartedAccount(): boolean {
        return Util.numToBoolean(+this.getting_started_stage1);
    }

    @Expose()
    private getting_started_stage2: string = undefined;

    @Expose()
    get gettingStartedBranding(): boolean {
        return Util.numToBoolean(+this.getting_started_stage2);
    }

    @Expose()
    private getting_started_stage3: string = undefined;

    @Expose()
    get gettingStartedOffer(): boolean {
        return Util.numToBoolean(+this.getting_started_stage3);
    }

    @Expose()
    private getting_started_stage4: string = undefined;

    @Expose()
    get gettingStartedAffiliate(): boolean {
        return Util.numToBoolean(+this.getting_started_stage4);
    }

    // aff_referral_commission: string;

    // aff_optional_fields: string;
    //
    // aff_payment_threshold: number;
    //
    // aff_redirect_url_after_signup: string;
    //
    // aff_referral_program: number;
    //
    // aff_referral_program_start_date: string;
    //
    // aff_required_fields: string;
    //
    // adv_custom_fields?: string;
    //
    // adv_allow_advertiser_signup: number;
    //
    // adv_auto_approve_new_users: number;
    //
    // adv_custom_signup_url: string;
    //
    // adv_default_managers: string[];
    //
    // adv_must_agree_with_privacy_policy: number;
    //
    //
    //

    //
    // adv_redirect_url_after_signup: string;
    //
    // adv_required_fields: string;
    //
    // currency: string;
    //
    // platform_time_zone: string;
    //
    // privacy_policy_url: string;
    //
    // terms_and_conditions_url: string;
    //
    // client_custom_code: string;
    //
    // intercom_users_code: string;
    //
    // yandex_metrika_code: string;
    //
    // show_getting_started: number;
    //
    // aff_referral_commission: string;
    //
    // aff_referral_commission_currency: CurrencyType;
    //
    // aff_referral_commission_type: string;
    //

    //
    // aff_auto_approve_postbacks: number;
    //
    // adv_allow_advertiser_signup: '1';
    //
    // adv_auto_approve_new_users: '0';
    //
    // adv_custom_fields: '[]';
    //
    // adv_custom_signup_url: '';
    //
    // adv_default_managers: '3';
    //
    // adv_must_agree_with_privacy_policy: '1';
    //
    // adv_must_agree_with_terms_and_conditions: '1';
    //
    // adv_optional_fields: '[]';
    //
    // adv_redirect_url_after_signup: '';
    //
    // adv_required_fields: '[10,8,11,9,26]';
    //
    // aff_auto_approve_postbacks: '0';
    //
    // aff_day_of_the_month: '7,15';
    //
    // aff_day_of_the_week: 'saturday';
    //
    // aff_optional_fields: '[]';
    //
    // aff_payment_frequency: '1';
    //
    // aff_payment_info: 'We make monthly payments with minimal threshold of $50 (or equivalent in case of another currency)!';
    //
    // aff_payment_threshold: '50';
    //
    // aff_payment_type: '1';
    //
    // aff_redirect_url_after_signup: 'http://www.scaleo.io?redirect';
    //
    // aff_referral_commission: '11';
    //
    // aff_referral_commission_currency: 'RUB';
    //
    // aff_referral_commission_source: '2';
    //
    // aff_referral_commission_type: '1';
    //
    // aff_referral_program: '1';
    //
    // aff_required_fields: '[4,5,6,7,12]';
    //
    // aff_tiers_json: '';
    //
    // api_url: 'https://dev.scaletrk.com';
    //
    // bucket_path_creatives: 'creatives/';
    //
    // bucket_path_offers: 'offers/';
    //
    // bucket_path_pixels: 'pixels/';
    //
    // bucket_path_platform: 'platform/';
    //
    // bucket_path_users: 'users/';
    //
    // bucket_url: 'https://s3.eu-central-1.amazonaws.com/storage.scaleo.io/';
    //
    // client_custom_code: '';
    //
    // client_url: 'https://dev.scaleo.io';
    //
    // company_website_url: 'https://www.scaleo.io/?r=dev';
    //
    // core_url: 'https://dev.scaletrk.com';
    //
    // currency: 'GBP';
    //
    // email_from: 'hello@scaleo.io';
    //
    // email_support: 'support@scaleo.io';
    //
    // getting_started_stage1: '1';
    //
    // getting_started_stage2: '1';
    //
    // getting_started_stage3: '1';
    //
    // getting_started_stage4: '1';
    //
    // intercom_users_code: '1';
    //
    // internal_domain: 'dev.scaleo.io';
    //
    // ips_blacklist_for_testing: '';
    //
    // ips_whitelist_for_testing: '193.178.229.228';
    //
    // login_page_theme_id: '1';
    //
    // mailroom_access_levels: 'admin';
    //
    // mailroom_email_address: 'hello@scaleo.io';
    //
    // platform_id: 'dev';
    //
    // platform_time_zone: 'Europe/Moscow';
    //
    // privacy_policy_url: 'https://www.scaleo.io/en/privacy';
    //
    // protect_admin_account: '0';
    //
    // set_theme_automatically: '0';
    //
    // show_getting_started: '0';
    //
    // terms_and_conditions_url: 'https://www.scaleo.io/en/terms';
    //
    // track_url: 'https://dev.scaletrk.com';
    //
    // tracking_domain: 'dev.scaletrk.com';
    //
    // 'uuid_token ': '';
    //
    // yandex_metrika_code: '1';
}
