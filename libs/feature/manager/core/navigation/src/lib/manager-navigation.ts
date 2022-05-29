import { MANAGER_ADVERTISER_ROUTES } from './navigations/advertiser-navigation';
import { MANAGER_AFFILIATE_ROUTES } from './navigations/affiliate-navigation';
import { DASHBOARD_NAVIGATION_ROUTES } from './navigations/dashboard-navigation';
import { MANAGER_OFFER_ROUTES } from './navigations/offer-navigation';
import { MANAGER_SETTINGS_NAVIGATION_ROUTES } from './navigations/settings-navigation';

export const MANAGER_NAVIGATION_PATH = {
    dashboard: DASHBOARD_NAVIGATION_ROUTES,
    offers: MANAGER_OFFER_ROUTES,
    affiliates: MANAGER_AFFILIATE_ROUTES,
    advertisers: MANAGER_ADVERTISER_ROUTES,
    settings: MANAGER_SETTINGS_NAVIGATION_ROUTES
};
