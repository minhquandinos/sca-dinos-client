import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ActivityLogEntityDetailWidgetModule } from '@scaleo/activity-log/shared/widgets/activity-log-entity/component';
import { SharedModule } from '@scaleo/core/shared/module';
import {
    ManagerActivityLogListDateRangePlaceEnum,
    ManagerActivityLogListEntityEnum
} from '@scaleo/feature/manager/activity-log/list/data-access';
import { ADVERTISER_DETAIL_STATE_PROVIDE } from '@scaleo/feature/manager/advertiser/detail/data-access';
import { MANAGER_ADVERTISER_UPSERT_PROVIDER } from '@scaleo/feature/manager/advertiser/upsert/data-access';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import {
    CustomChartModule,
    CustomDateRangeModule,
    CustomFieldViewModule,
    CustomInfoModule,
    ManagerListModule,
    StatusDotColorModule,
    TagsListModule
} from '@scaleo/shared/components';
import { ContactIconModule, ContactsProfileModule } from '@scaleo/shared/components/contact';
import { StickyModule } from '@scaleo/shared/directives';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { SharedWidgetsDetailWidgetWrapperModule } from '@scaleo/shared/widgets/detail-widget-wrapper';
import { DetailInfoModule, UiButtonLinkModule, UiPageWrapperModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AdvertiserDetailSubPageLayoutComponent } from './advertiser-detail-sub-page-layout/advertiser-detail-sub-page-layout.component';
import { AdvertiserDetailTopOffersWidgetModule } from './advertiser-detail-top-offers-widget/advertiser-detail-top-offers-widget.module';
import { AdvertiserProfileComponent } from './advertiser-profile.component';
// import { AdvertiserProfileFinancesModule } from './advertiser-profile-finances/advertiser-profile-finances.module';
import { AdvertiserProfileQuickLinksModule } from './advertiser-profile-quick-links/advertiser-profile-quick-links.module';
import { ProfileSkeletonComponent } from './profile-skeleton/profile-skeleton.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertiserProfileComponent
    },
    {
        path: '',
        component: AdvertiserDetailSubPageLayoutComponent,
        children: [
            {
                path: 'activity-log',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessActivityLog],
                        redirectTo: '/permission-denied'
                    },
                    header: 'main_navigation.activity_log',
                    dataRangePosition: ManagerActivityLogListDateRangePlaceEnum.FilterContainer,
                    cardHeaderTitle: 'activity_logs.title',
                    listQueryParams: ManagerActivityLogListEntityEnum.Advertiser
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/activity-log/list/page').then((m) => m.ManagerActivityLogListPageModule)
            }
        ]
    }
];

@NgModule({
    declarations: [AdvertiserProfileComponent, ProfileSkeletonComponent, AdvertiserDetailSubPageLayoutComponent],
    imports: [
        CommonModule,
        UiSvgIconModule,
        SharedModule,
        CustomChartModule,
        CustomDateRangeModule,
        // AdvertiserProfileFinancesModule,
        UiSkeletonModule,
        UiPageWrapperModule,
        ContactIconModule,
        ManagerListModule,
        TagsListModule,
        AdvertiserProfileQuickLinksModule,
        UiButtonLinkModule,
        ActivityLogEntityDetailWidgetModule,
        IsTruthyModule,
        ContactsProfileModule,
        CustomInfoModule,
        CustomFieldViewModule,
        StatusDotColorModule,
        PlatformFormatPipeModule,
        RouterModule.forChild(routes),
        DetailInfoModule,
        AdvertiserDetailTopOffersWidgetModule,
        SharedWidgetsDetailWidgetWrapperModule,
        FlexLayoutModule,
        StickyModule
    ],
    providers: [MANAGER_ADVERTISER_UPSERT_PROVIDER, ADVERTISER_DETAIL_STATE_PROVIDE],
    exports: [AdvertiserProfileComponent]
})
export class ManagerAdvertiserDetailPageModuleModule {}
