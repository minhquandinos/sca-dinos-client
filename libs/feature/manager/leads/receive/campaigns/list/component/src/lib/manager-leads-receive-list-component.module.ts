import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerLeadsReceiveUpsertModalFormModule } from '@scaleo/feature-manager-leads-receive-campaigns-upsert-form-modal';
import { GoalsListModule } from '@scaleo/offer/shared/fields/goals-list';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomPaginationModule, HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiButtonLinkModule, UiStatusColorModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { CampaignsFiltersModule } from './components/campaigns-filters/campaigns-filters.module';
import { ManagerLeadsReceiveListComponentComponent } from './manager-leads-receive-list-component.component';

@NgModule({
    declarations: [ManagerLeadsReceiveListComponentComponent],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        UiTable2Module,
        CustomPaginationModule,
        UiStatusColorModule,
        PlatformFormatPipeModule,
        TableNavigationModule,
        GoalsListModule,
        CampaignsFiltersModule,
        ManagerLeadsReceiveUpsertModalFormModule,
        NavigateRootModule,
        UiButtonLinkModule,
        HyperlinkModule
    ],
    exports: [ManagerLeadsReceiveListComponentComponent]
})
export class ManagerLeadsReceiveListComponentModule {}
