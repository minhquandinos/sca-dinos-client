import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';

export interface GeneralSettingsModel {
    // changed from PlarformAdministrationSettingsInterface
    default_language: string;
    show_language_selection: string;
    currency: string;
    custom_domain: string;
    internal_domain: string;
    tracking_domain: string;
    global_trafficback_url: string;
    mailroom_email_address: string;
    mailroom_access_levels: string;
    time_zone: string;
    datetime_format: string;
    show_getting_started: number;
    default_daterange: CustomDateRangeTitleEnum;
}
