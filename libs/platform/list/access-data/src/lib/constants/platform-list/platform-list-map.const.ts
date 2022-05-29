import { BaseObjectModel } from '@scaleo/core/data';

import { PlatformListModel } from '../../models/platform-list.model';
import { INVOICE_STATUS_TRANSLATE_MAP, OFFER_REQUEST_STATUS_TRANSLATE_MAP } from '../statuses';
import { ADJUSTMENTS_ACTIONS_TRANSLATE_MAP } from './adjustments-actions.const';
import { AFFILIATE_VISIBILITY_TRANSLATE_MAP } from './affiliate-visibility.const';
import { ASSIGN_NEW_USER_TRANSLATE_MAP } from './assign-new-user.const';
import { CONNECTION_TYPES_TRANSLATE_MAP } from './connection-types.const';
import { CREATIVE_TYPES_LIST_TRANSLATE_MAP } from './creative-types.const';
import { CUSTOM_PARAMS_ACTIONS_TRANSLATE_MAP } from './custom-params-actions.const';
import { CUSTOM_PARAMS_CONDITIONS_TRANSLATE_MAP } from './custom-params-conditions.const';
import { CUSTOM_PARAMS_TYPES_TRANSLATE_MAP } from './custom-params-types.const';
import { DEVICE_TYPES_TRANSLATE_MAP } from './device-types.const';
import { GOAL_TRACKING_METHOD_LIST_TRANSLATE_MAP } from './goal_tracking_methods.const';
import { GOAL_TYPES_LIST_TRANSLATE_MAP } from './goal-types.const';
import { GOAL_CAPS_PERIODS_TRANSLATE_MAP } from './goals-caps-periods.const';
import { GOAL_CAPS_TYPES_TRANSLATE_MAP } from './goals-caps-types.const';
import { INVOICES_PAYMENTS_TERMS_NAME_TRANSLATE_MAP, INVOICES_PAYMENTS_TERMS_TRANSLATE_MAP } from './invoices-payments-terms.const';
import { LEADS_RECEIVE_FIELDS_TRANSLATE_MAP } from './leads-receive-fields.const';
import { LEADS_RECEIVE_VALIDATIONS_TYPE_TRANSLATE_MAP } from './leads-receive-validations-type.const';
import { LEADS_RECEIVE_VALIDATIONS_TYPE_DUPLICATE_TRANSLATE_MAP } from './leads-receive-validations-type-duplicate.const';
import { LEADS_RECEIVE_VALIDATIONS_TYPE_FORMAT_TRANSLATE_MAP } from './leads-receive-validations-type-format.const';
import { OFFER_URLS_TYPE_TRANSLATE_MAP } from './offer-urls-type.const';
import { OFFER_AVAILABILITY_TRANSLATE_MAP } from './offers-availability.const';
import { OFFER_TARGETING_RULES_TRANSLATE_MAP } from './offers-targeting-rules.const';
import { OFFERS_VISIBILITY_TRANSLATE_MAP } from './offers-visibility-translate.const';
import { PAYMENTS_FREQUENCIES_NAME_TRANSLATE_MAP, PAYMENTS_FREQUENCIES_TRANSLATE_MAP } from './payments-frequencies.const';
import { POSTBACK_LEVEL_TRANSLATE_MAP } from './postback-level.const';
import { TRAFFIC_DISTRIBUTION_LIST_TRANSLATE_MAP } from './traffic-distribution.const';
import { TRAFFIC_DISTRIBUTION_METHODS_TRANSLATE_MAP } from './traffic-distribution-methods.const';

export const PLATFORM_LIST_TRANSLATE_MAP: { [K in keyof PlatformListModel]: BaseObjectModel } = {
    leads_receive_validations_type: LEADS_RECEIVE_VALIDATIONS_TYPE_TRANSLATE_MAP,
    leads_receive_validations_type_format: LEADS_RECEIVE_VALIDATIONS_TYPE_FORMAT_TRANSLATE_MAP,
    leads_receive_validations_type_duplicate_offer: LEADS_RECEIVE_VALIDATIONS_TYPE_DUPLICATE_TRANSLATE_MAP,
    leads_receive_validations_type_duplicate_all_offer: LEADS_RECEIVE_VALIDATIONS_TYPE_DUPLICATE_TRANSLATE_MAP,
    goals_types: GOAL_TYPES_LIST_TRANSLATE_MAP,
    leads_receive_fields: LEADS_RECEIVE_FIELDS_TRANSLATE_MAP,
    traffic_distribution: TRAFFIC_DISTRIBUTION_LIST_TRANSLATE_MAP,
    goals_caps_types: GOAL_CAPS_TYPES_TRANSLATE_MAP,
    goals_caps_periods: GOAL_CAPS_PERIODS_TRANSLATE_MAP,
    invoices_payments_terms: INVOICES_PAYMENTS_TERMS_TRANSLATE_MAP,
    invoices_payments_terms_for_filter: INVOICES_PAYMENTS_TERMS_NAME_TRANSLATE_MAP,
    payments_frequencies: PAYMENTS_FREQUENCIES_TRANSLATE_MAP,
    invoices_frequencies_for_filter: PAYMENTS_FREQUENCIES_NAME_TRANSLATE_MAP,
    goal_tracking_methods: GOAL_TRACKING_METHOD_LIST_TRANSLATE_MAP,
    affiliate_visibility: AFFILIATE_VISIBILITY_TRANSLATE_MAP,
    offers_visibility: OFFERS_VISIBILITY_TRANSLATE_MAP,
    offers_targeting_rules: OFFER_TARGETING_RULES_TRANSLATE_MAP,
    offer_urls_types: OFFER_URLS_TYPE_TRANSLATE_MAP,
    creatives_types: CREATIVE_TYPES_LIST_TRANSLATE_MAP,
    invoices_statuses: INVOICE_STATUS_TRANSLATE_MAP,
    custom_params_actions: CUSTOM_PARAMS_ACTIONS_TRANSLATE_MAP,
    custom_params_conditions: CUSTOM_PARAMS_CONDITIONS_TRANSLATE_MAP,
    custom_params_types: CUSTOM_PARAMS_TYPES_TRANSLATE_MAP,
    traffic_distribution_methods: TRAFFIC_DISTRIBUTION_METHODS_TRANSLATE_MAP,
    connection_types: CONNECTION_TYPES_TRANSLATE_MAP,
    device_types: DEVICE_TYPES_TRANSLATE_MAP,
    offers_requests_statuses: OFFER_REQUEST_STATUS_TRANSLATE_MAP,
    assign_new_user: ASSIGN_NEW_USER_TRANSLATE_MAP,
    offers_availability: OFFER_AVAILABILITY_TRANSLATE_MAP,
    postback_levels: POSTBACK_LEVEL_TRANSLATE_MAP,
    adjustments_actions: ADJUSTMENTS_ACTIONS_TRANSLATE_MAP
};
