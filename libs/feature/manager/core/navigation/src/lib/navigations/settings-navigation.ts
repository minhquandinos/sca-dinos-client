import { NavigationPathsType, NavigationPathType, navigationsPaths } from '@scaleo/core/navigation/common';

import { MANAGER_ROOT_PATH } from '../navigation-root.const';

const ROOT_PATH = 'settings';

const rootRoutes: NavigationPathType = {
    absolute: `${MANAGER_ROOT_PATH}/${ROOT_PATH}`,
    relative: ROOT_PATH,
    routePath: ROOT_PATH
};

const generalRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/general`,
    relative: 'general',
    routePath: 'general'
};

const brandingRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/branding`,
    relative: 'branding',
    routePath: 'branding'
};

const affiliatesRoutes: NavigationPathsType<'root' | 'general' | 'signUp'> = {
    root: {
        absolute: `/${ROOT_PATH}/affiliates`,
        relative: './affiliates',
        routePath: 'affiliates'
    },
    general: {
        absolute: `/${ROOT_PATH}/affiliates/general`,
        relative: './affiliates',
        routePath: 'affiliates'
    },
    signUp: {
        absolute: `/${ROOT_PATH}/affiliates/signup`,
        relative: 'signup',
        routePath: 'signup'
    }
};

const advertiserRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/advertisers/general`,
    relative: './general',
    routePath: 'general'
};

const billingRoutes: NavigationPathsType<'root' | 'affiliate' | 'paymentMethods'> = {
    root: {
        absolute: `/${ROOT_PATH}/billing`,
        relative: './billing',
        routePath: 'billing'
    },
    affiliate: {
        absolute: `/${ROOT_PATH}/billing/affiliate`,
        relative: './affiliate',
        routePath: 'affiliate'
    },
    paymentMethods: {
        absolute: `/${ROOT_PATH}/billing/payment-methods`,
        relative: './payment-methods',
        routePath: 'payment-methods'
    }
};

const securityRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/security`,
    relative: './security',
    routePath: 'security'
};

const listRoutes: NavigationPathsType<'root' | 'tags' | 'messengers' | 'trafficTypes'> = {
    root: {
        absolute: `/${ROOT_PATH}/list`,
        relative: './list',
        routePath: 'list'
    },
    tags: {
        absolute: `/${ROOT_PATH}/list/tags`,
        relative: './tags',
        routePath: 'tags'
    },
    messengers: {
        absolute: `/${ROOT_PATH}/list/messengers`,
        relative: './messengers',
        routePath: 'messengers'
    },
    trafficTypes: {
        absolute: `/${ROOT_PATH}/list/traffic-types`,
        relative: './traffic-types',
        routePath: 'traffic-types'
    }
};

const emailTemplatesRoutes: NavigationPathsType<'root' | 'general' | 'signUp' | 'offers'> = {
    root: {
        absolute: `/${ROOT_PATH}/email-templates`,
        relative: './email-templates',
        routePath: 'email-templates'
    },
    general: {
        absolute: `/${ROOT_PATH}/email-templates/general`,
        relative: './general',
        routePath: 'general'
    },
    signUp: {
        absolute: `/${ROOT_PATH}/email-templates/signup`,
        relative: './signup',
        routePath: 'signup'
    },
    offers: {
        absolute: `/${ROOT_PATH}/email-templates/offers`,
        relative: './email-templates/offers',
        routePath: 'email-templates/offers'
    }
};

const mobileAppRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/mobile-app`,
    relative: './mobile-app',
    routePath: 'mobile-app'
};

const rolesPermissionsRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/roles-permissions`,
    relative: './roles-permissions',
    routePath: 'roles-permissions'
};

const paths = {
    root: rootRoutes,
    general: generalRoutes,
    branding: brandingRoutes,
    affiliate: affiliatesRoutes,
    advertiser: advertiserRoutes,
    billing: billingRoutes,
    security: securityRoutes,
    list: listRoutes,
    emailTemplates: emailTemplatesRoutes,
    mobileAppRoutes: mobileAppRoutes,
    rolesPermissionsRoutes: rolesPermissionsRoutes
} as const;

export const MANAGER_SETTINGS_NAVIGATION_ROUTES = navigationsPaths<typeof paths>(paths);

export type ManagerSettingsNavigationType = typeof MANAGER_SETTINGS_NAVIGATION_ROUTES;
