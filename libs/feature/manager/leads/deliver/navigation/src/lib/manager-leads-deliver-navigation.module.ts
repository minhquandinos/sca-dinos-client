import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerLeadsDeliverNavigationComponent } from './manager-leads-deliver-navigation.component';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule, UiTabNavBarModule],
    declarations: [ManagerLeadsDeliverNavigationComponent]
})
export class ManagerLeadsDeliverNavigationModule {}
