import { NavigationPathType, navigationsPaths } from '@scaleo/core/navigation/common';

const ROOT_PATH = 'dashboard';

const dashboardRoute: NavigationPathType = {
    absolute: `/${ROOT_PATH}`,
    relative: ROOT_PATH,
    routePath: ROOT_PATH
};

const paths = {
    root: dashboardRoute
} as const;

export const DASHBOARD_NAVIGATION_ROUTES = navigationsPaths<typeof paths>(paths);
