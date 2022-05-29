import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementListComponent, AnnouncementListModule } from '@scaleo/feature/manager/outbound/announcements/list/component';

const routes: Routes = [
    {
        path: '',
        component: AnnouncementListComponent
    }
];

@NgModule({
    imports: [CommonModule, AnnouncementListModule, RouterModule.forChild(routes)]
})
export class ManagerAnnouncementsListPageModule {}
