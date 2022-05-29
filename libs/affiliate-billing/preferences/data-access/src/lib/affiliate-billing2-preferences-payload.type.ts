import {
    AffiliateBillingPreferencesRequestPayloadModel,
    AffiliateBillingPreferencesSchedulePayloadModel
} from './models/affiliate-billing-preferences.model';

export type AffiliateBilling2PreferencesPayloadType =
    | AffiliateBillingPreferencesRequestPayloadModel
    | AffiliateBillingPreferencesSchedulePayloadModel;
