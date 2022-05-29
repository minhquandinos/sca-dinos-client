import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadsListComponent } from '@scaleo/feature/manager/leads/manage/list';

const routes: Routes = [
    {
        path: '',
        component: LeadsListComponent,
        data: {
            header: 'main_navigation.leads'
        }
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ManagerLeadsManagePageModule {}
