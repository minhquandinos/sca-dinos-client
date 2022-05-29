import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoleListComponent, SettingsRolePermissionListModule } from '@scaleo/feature-manager-settings-role-list-component';

@NgModule({
    imports: [
        CommonModule,
        SettingsRolePermissionListModule,
        RouterModule.forChild([
            {
                path: '',
                component: RoleListComponent
            }
        ])
    ]
})
export class ManagerSettingsPermissionPageModule {}
