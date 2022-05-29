import { NavigationPathsType, NavigationPathType, navigationsPaths } from '@scaleo/core/navigation/common';

import { MANAGER_ROOT_PATH } from '../navigation-root.const';

const ROOT_PATH = 'affiliates';

const rootRoute: NavigationPathType = {
    absolute: `${MANAGER_ROOT_PATH}/${ROOT_PATH}`,
    relative: ROOT_PATH,
    routePath: ROOT_PATH
};

const listRoutes: NavigationPathsType<'all' | 'my' | 'pending'> = {
    all: {
        absolute: `/${ROOT_PATH}/all`,
        relative: './all',
        routePath: 'all'
    },
    my: {
        absolute: `${ROOT_PATH}/my`,
        relative: './my',
        routePath: 'my'
    },
    pending: {
        absolute: `${ROOT_PATH}/pending`,
        relative: './pending',
        routePath: 'pending'
    }
};

const detailRoute: NavigationPathType = {
    absolute: `/${ROOT_PATH}/:id`,
    relative: ':id',
    routePath: ':id'
};

const detailSubPagesRoutes: NavigationPathsType<'postbacks' | 'domains' | 'referrals' | 'activityLog'> = {
    postbacks: {
        absolute: `/${ROOT_PATH}/:id/postbacks`,
        relative: './postbacks',
        routePath: 'postbacks'
    },
    domains: {
        absolute: `/${ROOT_PATH}/:id/domains`,
        relative: 'domains',
        routePath: 'domains'
    },
    referrals: {
        absolute: `/${ROOT_PATH}/:id/referrals`,
        relative: 'referrals',
        routePath: 'referrals'
    },
    activityLog: {
        absolute: `/${ROOT_PATH}/:id/activity-log`,
        relative: 'activity-log',
        routePath: 'activity-log'
    }
};

const paths = {
    root: rootRoute,
    list: listRoutes,
    detail: detailRoute,
    subPages: detailSubPagesRoutes
} as const;

export const MANAGER_AFFILIATE_ROUTES = navigationsPaths<typeof paths>(paths);
