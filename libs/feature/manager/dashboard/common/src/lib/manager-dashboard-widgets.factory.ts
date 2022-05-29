// import { Type } from '@angular/core';
//
// import { DashboardWidgetFactoryInterface, WidgetEnum } from '@scaleo/dashboard/common';
// import { NetworkSummaryWidgetComponent } from '@scaleo/dashboard/shared/widgets/network-summary/component';
//
// // import { BalanceWidgetComponent } from '../components/widgets/balance-widget/balance-widget.component';
// // import { MgcomTopComponent } from '../components/widgets/mgcom/mgcom-top/mgcom-top.component';
// // import { NotificationsWidgetComponent } from '../components/widgets/notifications-widget/notifications-widget.component';
// // import { OfferPromoteWidgetComponent } from '../components/widgets/offer-promote-widget/offer-promote-widget.component';
// // import { PendingRecordsWidgetComponent } from '../components/widgets/pending-records-widget/pending-records-widget.component';
// // import { PerformanceWidgetComponent } from '../components/widgets/performance-widget/performance-widget.component';
// // import { ShortcutsWidgetComponent } from '../components/widgets/shortcuts-widget/shortcuts-widget.component';
// // import { TopAffiliateWidgetComponent } from '../components/widgets/top/top-affiliate-widget/top-affiliate-widget.component';
// // import { TopOfferWidgetComponent } from '../components/widgets/top/top-offer-widget/top-offer-widget.component';
//
// export class ManagerDashboardWidgetsFactory implements DashboardWidgetFactoryInterface {
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
