import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadsLogEnum } from '@scaleo/feature/manager/leads/logs/data-access';
import { LeadsLogsComponent, ManagerLeadsLogsListModule } from '@scaleo/feature/manager/leads/logs/list';

const routes: Routes = [
    {
        path: '',
        data: {
            header: 'main_navigation.logs'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: LeadsLogEnum.Incoming
            },
            {
                path: LeadsLogEnum.Incoming,
                component: LeadsLogsComponent,
                data: {
                    logType: LeadsLogEnum.Incoming
                }
            },
            {
                path: LeadsLogEnum.Outgoing,
                component: LeadsLogsComponent,
                data: {
                    logType: LeadsLogEnum.Outgoing
                }
            },
            {
                path: LeadsLogEnum.Changing,
                component: LeadsLogsComponent,
                data: {
                    logType: LeadsLogEnum.Changing
                }
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, ManagerLeadsLogsListModule, RouterModule.forChild(routes)]
})
export class ManagerLeadsLogsPagesModule {}
