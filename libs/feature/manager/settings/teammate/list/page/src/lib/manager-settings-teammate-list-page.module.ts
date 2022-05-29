import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeammateListComponent, TeammateListModule } from '@scaleo/feature/manager/settings/teammate/list/component';

@NgModule({
    imports: [
        CommonModule,
        TeammateListModule,
        RouterModule.forChild([
            {
                path: '',
                component: TeammateListComponent
            }
        ])
    ]
})
export class ManagerSettingsTeammateListPageModule {}
