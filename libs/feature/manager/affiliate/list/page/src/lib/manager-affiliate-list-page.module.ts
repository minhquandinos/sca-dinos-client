import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerAffiliateAccessPageGuard } from '@scaleo/feature/manager/affiliate/guards';
import { ManagerAffiliatesAccessPageService } from '@scaleo/feature/manager/affiliate/services';

import { ManagerAffiliateListPageRoutingModule } from './manager-affiliate-list-page-routing.module';

@NgModule({
    imports: [CommonModule, ManagerAffiliateListPageRoutingModule],
    providers: [ManagerAffiliateAccessPageGuard, ManagerAffiliatesAccessPageService]
})
export class ManagerAffiliateListPageModule {}
