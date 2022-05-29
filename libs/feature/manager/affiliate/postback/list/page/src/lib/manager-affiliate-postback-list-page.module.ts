import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    ConversionStatusModule,
    CustomPaginationModule,
    CustomSearchModule,
    FieldTextInfoModule,
    FiltersModule,
    StatusDotColorModule
} from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule, UiPageWrapperModule, UiTable2Module, UiTableModule } from '@scaleo/ui-kit/elements';

import { AffiliatePostbacksComponent } from './affiliate-postbacks.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliatePostbacksComponent
    }
];

@NgModule({
    declarations: [AffiliatePostbacksComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        FiltersModule,
        CustomSearchModule,
        CustomPaginationModule,
        UiTableModule,
        UiTable2Module,
        FindPlatformStatusesModule,
        ConversionStatusModule,
        StopPropagationDirectiveModule,
        FieldTextInfoModule,
        StatusDotColorModule
    ]
})
export class ManagerAffiliatePostbackListPageModule {}
