import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AffiliateAccessApiComponent } from './affiliate-access-api/affiliate-access-api.component';
import { AffiliateToolsApiModule } from './affiliate-access-api/affiliate-tools-api.module';

const router = [
    {
        path: '',
        component: AffiliateAccessApiComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(router), AffiliateToolsApiModule]
})
export class AffiliateToolsApiPageModule {}
