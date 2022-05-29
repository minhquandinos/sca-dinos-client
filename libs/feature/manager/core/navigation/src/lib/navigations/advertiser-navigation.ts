import { NavigationPathsType, NavigationPathType, navigationsPaths } from '@scaleo/core/navigation/common';

import { MANAGER_ROOT_PATH } from '../navigation-root.const';

const ROOT_PATH = 'advertisers';

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

const paths = {
    root: rootRoute,
    list: listRoutes,
    detail: detailRoute
} as const;

export const MANAGER_ADVERTISER_ROUTES = navigationsPaths<typeof paths>(paths);
