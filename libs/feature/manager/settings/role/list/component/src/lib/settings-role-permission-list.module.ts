import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { RolePermissionSharedModule } from '@scaleo/feature/manager/settings/role/shared';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { ManagerSettingsPermissionConfigurationUpsertModalFormModule } from '@scaleo/feature-manager-settings-role-upsert-modal-form';
import { UpgradePlanInfoModule } from '@scaleo/shared/components';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiChipModule,
    UiDividerModule,
    UiSimpleTableModule,
    UiSvgIconModule
} from '@scaleo/ui-kit/elements';

import { RoleDefaultPipe } from './role-list/pipes/role-default.pipe';
import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
    imports: [
        CommonModule,
        SettingsCardModule,
        SharedModule,
        UiButtonLinkModule,
        UiSimpleTableModule,
        UpgradePlanInfoModule,
        TableNavigationModule,
        UiSvgIconModule,
        UiCard2Module,
        UiDividerModule,
        UiChipModule,
        ManagerSettingsPermissionConfigurationUpsertModalFormModule,
        RolePermissionSharedModule
    ],
    declarations: [RoleListComponent, RoleDefaultPipe],
    exports: [RoleListComponent]
})
export class SettingsRolePermissionListModule {}
