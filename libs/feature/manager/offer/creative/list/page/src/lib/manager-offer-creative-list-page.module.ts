import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferConfigCreativesComponent, OfferConfigCreativesModule } from '@scaleo/feature/manager/offer/creative/list/component';

const routes: Routes = [
    {
        path: '',
        component: OfferConfigCreativesComponent
    }
];

@NgModule({
    imports: [CommonModule, OfferConfigCreativesModule, RouterModule.forChild(routes)]
})
export class ManagerOfferCreativeListPageModule {}
