import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerOfferRequestListModule, OffersRequestsComponent } from '@scaleo/feature/manager/offer/request/list/component';

const routes: Routes = [
    {
        path: '',
        component: OffersRequestsComponent,
        data: {
            header: 'offers_requests_page.title'
        }
    }
];

@NgModule({
    imports: [CommonModule, ManagerOfferRequestListModule, RouterModule.forChild(routes)]
})
export class ManagerOfferRequestListPageModule {}
