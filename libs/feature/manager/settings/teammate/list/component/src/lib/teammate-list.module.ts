import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { RolePermissionSharedModule } from '@scaleo/feature/manager/settings/role/shared';
import { ManagerSettingsTeammateUpsertModalFormModule } from '@scaleo/feature/manager/settings/teammate/upsert/modal-form';
import {
    ApiAccessModule,
    CustomInfoModule,
    CustomPaginationModule,
    CustomSearchModule,
    DateVariantModule,
    DropdownListModule,
    DropdownPopupModule,
    FiltersModule,
    FormLogoModule,
    ManagerReferrerLinkToSignUpModule,
    StatusDotColorModule
} from '@scaleo/shared/components';
import { FindManagersModule, FindPlatformStatusesModule, FindRoleModule } from '@scaleo/shared/components/find';
import { CustomTranslatePipeModule, DefaultImageModule, IsTruthyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiChipModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTable2Module,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { TeammateListComponent } from './teammate-list.component';

@NgModule({
    declarations: [TeammateListComponent],
    exports: [TeammateListComponent],
    imports: [
        CommonModule,
        RouterModule,
        CustomSearchModule,
        DropdownListModule,
        FormLogoModule,
        SharedModule,
        UiTableModule,
        UiSkeletonModule,
        UiImageModule,
        CustomInfoModule,
        UiButtonLinkModule,
        CustomPaginationModule,
        UiSvgIconModule,
        DateVariantModule,
        FiltersModule,
        DropdownPopupModule,
        UiChipModule,
        FindPlatformStatusesModule,
        ApiAccessModule,
        FindManagersModule,
        ManagerReferrerLinkToSignUpModule,
        CustomTranslatePipeModule,
        ManagerSettingsTeammateUpsertModalFormModule,
        UiTable2Module,
        UiPageWrapperModule,
        StatusDotColorModule,
        IsTruthyModule,
        TableNavigationModule,
        FindRoleModule,
        DefaultImageModule,
        RolePermissionSharedModule
    ]
})
export class TeammateListModule {}
