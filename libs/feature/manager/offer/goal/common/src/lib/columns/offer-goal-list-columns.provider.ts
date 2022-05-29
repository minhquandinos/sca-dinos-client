import { Provider } from '@angular/core';

import { OfferGoalsWidgetColumnEnum } from '@scaleo/feature/manager/offer/goal/widget/data-access';
import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

import { OFFER_GOALS_COLUMNS_TOKEN } from './offer-goal-list-columns.token';

export const offerGoalColumnListFactory = (columns: UiSimpleTableHeaderModel[] = []): Provider => {
    return {
        provide: OFFER_GOALS_COLUMNS_TOKEN,
        useFactory: (permissionService: CheckPermissionService) => {
            const columnsPermission: { [key in OfferGoalsWidgetColumnEnum]?: boolean } = {
                [OfferGoalsWidgetColumnEnum.Revenue]: permissionService.check(PLATFORM_PERMISSIONS.canSeeRevenue),
                // [OfferGoalsWidgetColumnEnum.Payout]: permissionService.check(PLATFORM_PERMISSIONS.generalAccessPayout),
                [OfferGoalsWidgetColumnEnum.Postback]: permissionService.check(PLATFORM_PERMISSIONS.canAddEditDeleteOffers)
            };
            return columns.filter((column) => {
                const check = columnsPermission?.[column.value as OfferGoalsWidgetColumnEnum];
                return check !== undefined ? columnsPermission?.[column.value as OfferGoalsWidgetColumnEnum] : true;
            });
        },
        deps: [CheckPermissionService]
    };
};
