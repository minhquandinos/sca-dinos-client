import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosizeModule } from 'ngx-autosize';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAdvertiserUpsertModule } from '@scaleo/feature/manager/advertiser/upsert/component';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportFieldInsightsModule } from '@scaleo/reports/shared/format-fields';
import {
    CustomInfoModule,
    CustomPaginationModule,
    CustomSearchModule,
    DateVariantModule,
    ManagerListModule,
    ModalExportModule,
    TableConversionModule,
    TagsListModule
} from '@scaleo/shared/components';
import { ContactIconModule, ContactListIconModule } from '@scaleo/shared/components/contact';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiBadgesModule,
    UiButtonLinkModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { AdvertisersComponent } from './advertisers.component';
import { AdvertisersListFiltersModule } from './components/advertisers-list-filters/advertisers-list-filters.module';
import { ManagerAccessAdvertisersNavigationModule } from './components/manager-access-advertisers-navigation/manager-access-advertisers-navigation.module';

const routes: Routes = [
    {
        path: '',
        component: AdvertisersComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AutosizeModule,
        CustomPaginationModule,
        UiButtonLinkModule,
        CustomInfoModule,
        UiSkeletonModule,
        UiImageModule,
        UiStatusColorModule,
        SharedModule,
        UiSvgIconModule,
        ManagerAdvertiserUpsertModule,
        ManagerListModule,
        TagsListModule,
        DateVariantModule,
        ContactIconModule,
        UiBadgesModule,
        ContactListIconModule,
        UiPageWrapperModule,
        PlatformFormatPipeModule,
        TableConversionModule,
        ReportFieldInsightsModule,
        AdvertisersListFiltersModule,
        UiTable2Module,
        TableNavigationModule,
        IsTruthyModule,
        MediaWatcherDirectiveModule,
        ModalExportModule,
        CustomSearchModule,
        ManagerAccessAdvertisersNavigationModule
    ],
    declarations: [AdvertisersComponent],
    exports: [AdvertisersComponent]
})
export class AdvertisersModule {}
