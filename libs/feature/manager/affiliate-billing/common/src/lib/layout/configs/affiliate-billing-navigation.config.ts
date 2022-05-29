import { PLATFORM_PERMISSIONS, PlatformPermissionsUnionType } from '@scaleo/platform/permission/role';
import { UiTabModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

import { AffiliateBillingNavigationEnum } from '../enums/affiliate-billing-navigation.enum';

export interface AffiliateBillingNavigationModel extends UiTabModel {
    permission: PlatformPermissionsUnionType;
}

const config: AffiliateBillingNavigationModel[] = [
    {
        id: 'affiliates',
        title: 'main_navigation.affiliates',
        route: AffiliateBillingNavigationEnum.Affiliates,
        permission: PLATFORM_PERMISSIONS.canAccessAffiliateBilling
    },
    {
        id: 'invoices',
        title: 'invoice.invoices_title',
        route: AffiliateBillingNavigationEnum.Invoices,
        permission: PLATFORM_PERMISSIONS.canAccessAffiliateInvoices
    }
];

export const affiliateBillingNavigationConfig = getConfig<AffiliateBillingNavigationModel[]>(config);
