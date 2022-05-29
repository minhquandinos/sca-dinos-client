import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferLandingPageComponent, OfferLandingPageModule } from '@scaleo/feature/manager/offer/landing-page/list/component';

const routes: Routes = [
    {
        path: '',
        component: OfferLandingPageComponent
    }
];

@NgModule({
    imports: [CommonModule, OfferLandingPageModule, RouterModule.forChild(routes)]
})
export class ManagerOfferLandingPageListPageModule {}
