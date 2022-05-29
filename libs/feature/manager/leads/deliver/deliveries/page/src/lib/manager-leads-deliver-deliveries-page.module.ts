import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliveriesComponent } from '@scaleo/feature-manager-leads-deliver-deliveries-list-component';

export const routes: Routes = [
    {
        path: '',
        component: DeliveriesComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ManagerLeadsDeliverDeliveriesPageModule {}
