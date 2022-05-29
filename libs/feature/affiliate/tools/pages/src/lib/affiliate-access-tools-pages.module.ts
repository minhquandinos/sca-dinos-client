import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { BooleanEnum } from '@scaleo/core/data';
import { MobileAppToolGuard } from '@scaleo/feature/shared/mobile-app/guards';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { BaseNavModel } from '@scaleo/shared/data';
import { StickyModule } from '@scaleo/shared/directives';
import { SidenavModule } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { AffiliateToolsLayoutComponent } from './affiliate-tools-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateToolsLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'postbacks'
            },
            {
                path: 'postbacks',
                data: {
                    header: 'affiliate.postback.title'
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/tools/postbacks/pages').then((m) => m.AffiliateToolsPostbacksPagesModule)
            },
            // {
            //     path: 'activity-log',
            //     data: {
            //         header: 'main_navigation.activity_log'
            //     },
            //     loadChildren: (): Promise<any> =>
            //         import('@scaleo/feature/affiliate/activity-log/list/page').then((m) => m.AffiliateActivityLogListPageModule)
            // },
            {
                path: 'mobile-app',
                data: {
                    header: 'mobile_app.title'
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/tools/mobile-app/page').then((m) => m.AffiliateToolsMobileAppPageModule),
                canActivate: [MobileAppToolGuard]
            },
            {
                path: 'api',
                data: {
                    header: 'tools_page.api.title'
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/tools/api/page').then((m) => m.AffiliateToolsApiPageModule)
            }
        ]
    }
];

export const AFFILIATE_TOOLS_NAVIGATION_TOKEN = new InjectionToken<BaseNavModel[]>('AffiliateToolsNavigationToken');

const toolsLayoutNavigationTransform = (navigation: BaseNavModel[], enabledMobileApp: BooleanEnum, showMobile: BooleanEnum) => {
    if (enabledMobileApp && showMobile) {
        return navigation;
    }
    return ArrayUtil.removeByKey(navigation, 'routeLink', 'mobile-app');
};

const navigationFactory = ({ settings }: PlatformSettingsQuery) => {
    const { mobile_app, show_mobile_affiliates } = settings;

    const navigation: BaseNavModel[] = [
        {
            title: 'affiliate.postback.title',
            routeLink: 'postbacks'
        },
        // {
        //     title: 'main_navigation.activity_log',
        //     routeLink: 'activity-log'
        // },
        {
            title: 'mobile_app.menu',
            routeLink: 'mobile-app'
        },
        {
            title: 'tools_page.api.title',
            routeLink: 'api'
        }
    ];

    return toolsLayoutNavigationTransform(navigation, mobile_app, show_mobile_affiliates);
};

@NgModule({
    declarations: [AffiliateToolsLayoutComponent],
    imports: [CommonModule, SidenavModule, FlexModule, StickyModule, RouterModule.forChild(routes)],
    providers: [
        {
            provide: AFFILIATE_TOOLS_NAVIGATION_TOKEN,
            useFactory: (platformSettingsQuery: PlatformSettingsQuery) => navigationFactory(platformSettingsQuery),
            deps: [PlatformSettingsQuery]
        }
    ]
})
export class AffiliateAccessToolsPagesModule {}
