import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AffiliatePostbacksUpsertModalFormModule } from '@scaleo/feature/affiliate/tools/postbacks/upsert/modal-form';
import {
    ConversionStatusModule,
    CustomPaginationModule,
    FieldTextInfoModule,
    FiltersModule,
    HyperlinkModule,
    ListNavBarModule,
    StatusDotColorModule
} from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { TableNavigationModule, UiButtonLinkModule, UiPageWrapperModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { AffiliatePostbacksListComponent } from './affiliate-postbacks-list.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliatePostbacksListComponent
    }
];

@NgModule({
    declarations: [AffiliatePostbacksListComponent],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        ListNavBarModule,
        CustomPaginationModule,
        TableNavigationModule,
        UiTable2Module,
        FiltersModule,
        FindPlatformStatusesModule,
        SharedModule,
        ConversionStatusModule,
        StopPropagationDirectiveModule,
        FieldTextInfoModule,
        HyperlinkModule,
        StatusDotColorModule,
        RouterModule.forChild(routes),
        AffiliatePostbacksUpsertModalFormModule
    ]
})
export class AffiliatePostbacksListModule {}
