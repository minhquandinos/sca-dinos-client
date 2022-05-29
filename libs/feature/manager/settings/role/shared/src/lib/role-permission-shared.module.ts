import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RolePermissionInfoPipe } from './role-permission-info.pipe';
import { RolePermissionVisibilityPipe } from './role-permission-visibility.pipe';

const pipes = [RolePermissionVisibilityPipe, RolePermissionInfoPipe];

@NgModule({
    declarations: [...pipes],
    exports: [...pipes],
    imports: [CommonModule]
})
export class RolePermissionSharedModule {}
