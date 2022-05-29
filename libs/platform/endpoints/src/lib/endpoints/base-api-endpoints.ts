import { EndpointsModel } from '../endpoints.model';

export const BASE_API_ENDPOINTS: Readonly<EndpointsModel> = {
    'platform-settings': '/platform/settings',
    'user-profile': '/user/profile',
    'user-profile-update': '/user/profile',
    'user-profile-delete-image': '/user/profile/delete-image',
    'change-api-key': '/user/change-api-key',
    'user-login-as': '/user/login-as',
    'platform-list': '/platform/lists',
    'verify-email': '/user/verify-email/{token}',
    'browsers-get-filter-info': '/detector/browsers/get-filter-info',
    'mobile-operators-get-filter-info': '/locator/mobile-operators/get-filter-info',
    'operating-systems-get-filter-info': '/detector/operating-systems/get-filter-info',
    'device-brands-get-filter-info': '/detector/brands/get-filter-info',
    'device-models-get-filter-info': '/detector/models/get-filter-info',
    'locales-get-filter-info': '/platform/locales/get-filter-info',
    'geoip-get-geonames': '/geoip/default/get-geonames',
    'mobile-login-link': '/mobile/login-link',
    'role-list': '/roles/list',
    'base-role-list': '/roles/base-list',
    'get-first-active-affiliate': '/affiliates/get-first-active-affiliate'
} as const;
