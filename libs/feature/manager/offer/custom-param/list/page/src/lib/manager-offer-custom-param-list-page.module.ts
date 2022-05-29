import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferCustomParamsComponent, OfferCustomParamsModule } from '@scaleo/feature/manager/offer/custom-param/list/component';

const routes: Routes = [
    {
        path: '',
        component: OfferCustomParamsComponent
    }
];

@NgModule({
    imports: [CommonModule, OfferCustomParamsModule, RouterModule.forChild(routes)]
})
export class ManagerOfferCustomParamListPageModule {}
