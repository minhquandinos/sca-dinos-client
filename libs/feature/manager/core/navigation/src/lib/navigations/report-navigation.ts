import { MANAGER_ROOT_PATH } from '../navigation-root.const';

export interface DashboardNavigationModel {
    dashboard: string;
}

export const DASHBOARD_PATHS: DashboardNavigationModel = {
    dashboard: 'dashboard'
};

const ROOT_PATH = `${MANAGER_ROOT_PATH}/offers`;

const root = (path: string): string => `${ROOT_PATH}/${path}`;

export const affiliateNavigation = ((): DashboardNavigationModel => {
    const dashboard = root('dashboard');

    return {
        dashboard
    };
})();
