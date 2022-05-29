export const PLATFORM_PERMISSIONS = {
    // Role
    adminOnly: 'base_role_admin_only',
    managerOnly: 'base_role_manager_only',
    affManagerOnly: 'base_role_aff_manager_only',
    advManagerOnly: 'base_role_adv_manager_only',

    // General
    canSeeRevenue: 'can_see_revenue',
    canSeePayout: 'can_see_payout',
    canSeePendingConv: 'can_see_pending_conversions',
    canSeeRejectedConversions: 'can_see_rejected_conversions',
    canSeeTrashConversions: 'can_see_trash_conversions',
    canSeeLeadDetails: 'can_see_lead_details',

    // User Visibility
    visibilityAllUsers: 'can_access_all_users',
    visibilityAssignedUsers: 'can_access_assigned_users_only',

    // Dashboard
    canAccessDashboard: 'can_access_dashboard',

    // Offers
    canAccessOffers: 'can_access_offers',
    canAddEditDeleteOffers: 'can_add_edit_delete_offers',
    canManageOfferAccess: 'can_manage_offer_access',
    canManageOfferRequests: 'can_manage_offer_requests',
    canManageCustomParameters: 'can_manage_custom_parameters',
    canAddEditDeleteSmartLinks: 'can_add_edit_delete_smart_links',
    canExportOffers: 'can_export_offers',

    // Offers Front
    frontCanShowAffiliateInfoUpsertCustomParam: 'front_can_show_affiliate_info_upsert_custom_param',
    frontCanShowPaginationCustomParamWidget: 'front_can_show_pagination_custom_param_widget',
    // frontCanShowTrafficDistribution: 'front_can_show_traffic_distribution',
    frontShowVisibleTypeOffers: 'front_show_visible_type_offers',
    // frontShowAdvertiserNameOffers: 'front_show_advertiser_name_offers',
    frontShowAffEpcKeyOffers: 'front_show_aff_epc_key_offers',
    // frontShowAdvertisersFilterOffers: 'front_show_advertisers_filter_offers',
    // frontShowHintOffers: 'front_show_hint_offers',
    frontCancanUpdateApprovalQaOfferAffiliateAccess: 'front_can_update_approval_qa_offer_affiliate_access',

    // Affiliates
    canAccessAffiliates: 'can_access_affiliates',
    canAddEditDeleteAffiliates: 'can_add_edit_delete_affiliates',
    canAddEditDeletePostbacks: 'can_add_edit_delete_postbacks',
    canAddEditDeleteDomains: 'can_add_edit_delete_domains',
    canExportAffiliates: 'can_export_affiliates',

    // Affiliates Front
    frontSetManagerIdAffiliateUpsert: 'front_set_manager_id_affiliate_upsert',
    // frontShowHintAffiliates: 'front_show_hint_affiliates',
    // frontCanAccessReferral: 'front_can_access_referral',
    // frontDisableReferralControlAffiliateSettings: 'front_disable_referral_control_affiliate_settings',
    frontCanAccessAffiliateDetailNestedPages: 'front_can_access_affiliate_detail_nested_pages',

    // Advertisers
    canAccessAdvertisers: 'can_access_advertisers',
    canAddEditDeleteAdvertisers: 'can_add_edit_delete_advertisers',
    canExportAdvertisers: 'can_export_advertisers',

    // Reports
    canAccessReports: 'can_access_reports',
    canSeeReferralReports: 'can_see_referral_reports',
    canExportReports: 'can_export_reports',
    reportsMetricsCanSeeAll: 'reports_metrics_can_see_all',
    reportsMetricsCanSeeAdmin: 'reports_metrics_can_see_admin',
    reportsMetricsCanSeeManager: 'reports_metrics_can_see_manager',
    reportsMetricsCanSeeAllManager: 'reports_metrics_can_see_all_manager',
    reportsMetricsCanSeeAffiliate: 'reports_metrics_can_see_affiliate',
    reportsMetricsCanSeeAdvertiser: 'reports_metrics_can_see_advertiser',

    //Referral
    frontCanSeeReferralReportBaseAmount: 'front_can_see_referral_report_base_amount',

    // Reports front
    // frontCanSeeAdvertiserBreakdownReports: 'front_can_see_advertiser_breakdown_reports',

    // Transactions
    canAccessConversions: 'can_access_conversions',
    canChangeConversionStatus: 'can_add_edit_conversions', // Can change Conversion status
    canExportConversions: 'can_export_conversions',
    canAccessClicks: 'can_access_clicks',
    canExportClicks: 'can_export_clicks',
    canAccessInvalidClicks: 'can_access_invalid_clicks',
    canAccessAffiliatePostbacksLog: 'can_access_affiliate_postbacks_log',
    canAccessAdvertiserPostbacksLog: 'can_access_advertiser_postbacks_log',

    // Adjustments
    canAccessAdjustments: 'can_access_adjustments',

    // Affiliate Billing
    canAccessAffiliateBilling: 'can_access_affiliate_billing',
    canAccessAffiliateInvoices: 'can_access_affiliate_invoices',
    canGenerateEditDeleteInvoices: 'can_generate_edit_delete_invoices',

    // Anouncements
    canAccessAnouncements: 'can_access_anouncements',
    canAddEditDeleteAnouncements: 'can_add_edit_delete_anouncements',

    // Team
    canAccessTeammates: 'can_access_teammates',
    canInviteEditDeleteTeammates: 'can_invite_edit_delete_teammates',
    canAccessActivityLog: 'can_access_activity_log',

    // Leads
    canAccessLeads: 'can_access_leads',
    canAccessLeadsLog: 'can_access_leads_log',
    canManageLeadsCampaignsAndDelivery: 'can_manage_leads_campaigns_and_delivery',

    // User Visibility
    canAccessAllUsers: 'can_access_all_users',
    canAccessAssignedUsersOnly: 'can_access_assigned_users_only',

    // General
    // canSeeRevenueMetric: 'can_see_revenue_metric',
    // canAccessPayoutMetric: 'can_access_payout_metric',
    // canAccessProfitMetric: 'can_access_profit_metric',
    // performance: 'performance',

    // Announcements
    canAccessAnnouncements: 'can_access_announcements',
    canAddEditDeleteAnnouncements: 'can_add_edit_delete_announcements'
} as const;

export type PlatformPermissionsUnionType = typeof PLATFORM_PERMISSIONS[keyof typeof PLATFORM_PERMISSIONS];

export type PlatformPermissionsType = typeof PLATFORM_PERMISSIONS;
