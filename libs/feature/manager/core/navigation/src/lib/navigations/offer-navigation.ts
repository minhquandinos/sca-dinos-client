import { NavigationPathsType, NavigationPathType, navigationsPaths } from '@scaleo/core/navigation/common';

import { MANAGER_ROOT_PATH } from '../navigation-root.const';

const ROOT_PATH = 'offers';

const rootRoutes: NavigationPathType = {
    absolute: `${MANAGER_ROOT_PATH}/${ROOT_PATH}`,
    relative: ROOT_PATH,
    routePath: ROOT_PATH
};

const offerRoute: NavigationPathsType<'all' | 'featured' | 'requests' | 'smartLinks'> = {
    all: {
        absolute: `/${ROOT_PATH}/all`,
        relative: './all',
        routePath: 'all'
    },
    featured: {
        absolute: `${ROOT_PATH}/featured`,
        relative: './featured',
        routePath: 'featured'
    },
    requests: {
        absolute: `${ROOT_PATH}/requests`,
        relative: './requests',
        routePath: 'requests'
    },
    smartLinks: {
        absolute: `${ROOT_PATH}/smart-links`,
        relative: './smart-links',
        routePath: 'smart-links'
    }
};

const offerDetailRoutes: NavigationPathType = {
    absolute: `/${ROOT_PATH}/:id`,
    relative: ':id',
    routePath: ':id'
};

const offerDetailSubPagesRoutes: NavigationPathsType<'goals' | 'landingPage' | 'creatives' | 'customParams' | 'activityLog'> = {
    goals: {
        absolute: `/${ROOT_PATH}/:id/goals`,
        relative: './goals',
        routePath: 'goals'
    },
    landingPage: {
        absolute: `/${ROOT_PATH}/:id/urls`,
        relative: 'urls',
        routePath: 'urls'
    },
    creatives: {
        absolute: `/${ROOT_PATH}/:id/creatives`,
        relative: 'creatives',
        routePath: 'creatives'
    },
    customParams: {
        absolute: `${ROOT_PATH}/:id/custom-params`,
        relative: 'custom-params',
        routePath: 'custom-params'
    },
    activityLog: {
        absolute: `/${ROOT_PATH}/:id/activity-log`,
        relative: 'activity-log',
        routePath: 'activity-log'
    }
};

const paths = {
    root: rootRoutes,
    list: offerRoute,
    detail: offerDetailRoutes,
    subPages: offerDetailSubPagesRoutes
} as const;

export const MANAGER_OFFER_ROUTES = navigationsPaths<typeof paths>(paths);
