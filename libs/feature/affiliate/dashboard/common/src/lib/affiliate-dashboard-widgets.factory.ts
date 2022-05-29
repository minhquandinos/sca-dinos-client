// import { Type } from '@angular/core';
//
// import { DashboardWidgetFactoryInterface, WidgetEnum } from '@scaleo/dashboard/common';
// import { NetworkSummaryWidgetComponent } from '@scaleo/dashboard/shared/widgets/network-summary/component';
//
// export class AffiliateDashboardWidgetsFactory implements DashboardWidgetFactoryInterface {
//     constructor(protected componentIdentifier: WidgetEnum) {}
//
//     getComponent(): Type<any> {
//         switch (this.componentIdentifier) {
//             case WidgetEnum.NETWORK_SUMMARY:
//                 return NetworkSummaryWidgetComponent;
//             // case WidgetEnum.NOTIFICATIONS:
//             //     return NotificationsWidgetComponent;
//             // case WidgetEnum.PENDING_RECORDS:
//             //     return PendingRecordsWidgetComponent;
//             // case WidgetEnum.PERFORMANCE:
//             //     return PerformanceWidgetComponent;
//             // case WidgetEnum.TOP_AFFILIATE:
//             //     return TopAffiliateWidgetComponent;
//             // case WidgetEnum.ANNOUNCEMENTS:
//             //     return AnnouncementsWidgetComponent;
//             // case WidgetEnum.TOP_OFFER:
//             //     return TopOfferWidgetComponent;
//             // case WidgetEnum.SHORTCUTS:
//             //     return ShortcutsWidgetComponent;
//             // case WidgetEnum.MGCOM_TOP:
//             //     return MgcomTopComponent;
//             // case WidgetEnum.OFFER_PROMOTE:
//             //     return OfferPromoteWidgetComponent;
//             // case WidgetEnum.BALANCE:
//             //     return BalanceWidgetComponent;
//             default:
//                 throw new Error(`Dosn't have ${this.componentIdentifier} component in this factory`);
//         }
//     }
// }
