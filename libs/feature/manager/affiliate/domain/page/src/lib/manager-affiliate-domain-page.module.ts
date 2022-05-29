import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateDomainComponent, ManagerAffiliateDomainListModule } from '@scaleo/feature/manager/affiliate/domain/list';

const routes: Routes = [
    {
        path: '',
        component: AffiliateDomainComponent
    }
];

@NgModule({
    imports: [CommonModule, ManagerAffiliateDomainListModule, RouterModule.forChild(routes)]
})
export class ManagerAffiliateDomainPageModule {}
