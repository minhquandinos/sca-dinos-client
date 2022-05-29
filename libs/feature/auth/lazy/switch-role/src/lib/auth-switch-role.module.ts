import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwitchRoleComponent } from './switch-role.component';

const routes: Routes = [
    {
        path: '',
        component: SwitchRoleComponent
    }
];

@NgModule({
    declarations: [SwitchRoleComponent],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AuthSwitchRoleModule {}
