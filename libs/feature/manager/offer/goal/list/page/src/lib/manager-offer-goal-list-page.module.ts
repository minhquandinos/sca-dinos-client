import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferGoalsCollectionComponent, OfferGoalsCollectionModule } from '@scaleo/feature/manager/offer/goal/list/component';

const routes: Routes = [
    {
        path: '',
        component: OfferGoalsCollectionComponent
    }
];

@NgModule({
    imports: [CommonModule, OfferGoalsCollectionModule, RouterModule.forChild(routes)]
})
export class ManagerOfferGoalListPageModule {}
