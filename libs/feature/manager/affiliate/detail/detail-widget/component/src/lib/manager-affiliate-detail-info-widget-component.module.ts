import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingPreferencesViewModule } from '@scaleo/affiliate-billing/preferences/filds-view';
import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateUpsertModalFormModule } from '@scaleo/feature/manager/affiliate/upsert/modal-form';
import { ManagerBillingPreferencesFieldsViewModule } from '@scaleo/feature/manager/affiliate-billing/preferences/fields-view';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportFieldInsightsModule } from '@scaleo/reports/shared/format-fields';
import {
    CustomFieldViewModule,
    CustomInfoModule,
    FieldTextInfoModule,
    ManagerListModule,
    NavigateRootModule,
    QuickLinksModule,
    StatusDotColorModule,
    TagsListModule
} from '@scaleo/shared/components';
import { ContactIconModule, ContactsProfileModule } from '@scaleo/shared/components/contact';
import { DefaultImageModule, IsTruthyModule } from '@scaleo/shared/pipes';
import {
    DetailInfoModule,
    UiButtonLinkModule,
    UiDividerModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule
} from '@scaleo/ui-kit/elements';

import { AffiliateDetailComponent } from './components/affiliate-detail/affiliate-detail.component';
import { AffiliateDetailQuickLinksComponent } from './components/affiliate-detail-quick-links/affiliate-detail-quick-links.component';
import { AffiliateDetailSettingsModule } from './containers/affiliate-detail-settings/affiliate-detail-settings.module';

@NgModule({
    declarations: [AffiliateDetailComponent, AffiliateDetailQuickLinksComponent],
    imports: [
        CommonModule,
        SharedModule,
        ContactIconModule,
        UiSvgIconModule,
        ManagerListModule,
        TagsListModule,
        UiButtonLinkModule,
        CustomInfoModule,
        UiSkeletonModule,
        IsTruthyModule,
        ContactsProfileModule,
        CustomFieldViewModule,
        ManagerBillingPreferencesFieldsViewModule,
        DetailInfoModule,
        UiPageWrapperModule,
        UiDividerModule,
        BillingPreferencesViewModule.forRoot(),
        UiImageModule,
        QuickLinksModule,
        ReportFieldInsightsModule,
        FieldTextInfoModule,
        NavigateRootModule,
        PlatformFormatPipeModule,
        AffiliateDetailSettingsModule,
        StatusDotColorModule,
        NavigateRootModule,
        RouterModule,
        DefaultImageModule,
        ManagerAffiliateUpsertModalFormModule
    ],
    exports: [AffiliateDetailComponent]
})
export class ManagerAffiliateDetailInfoWidgetComponentModule {}
