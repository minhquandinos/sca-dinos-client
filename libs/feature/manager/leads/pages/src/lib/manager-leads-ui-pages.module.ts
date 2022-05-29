import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerLeadsUiLayoutComponent } from './manager-leads-ui-layout.component';
import { ManagerLeadsUiRoutingModule } from './manager-leads-ui-routing.module';

@NgModule({
    declarations: [ManagerLeadsUiLayoutComponent],
    imports: [CommonModule, ManagerLeadsUiRoutingModule]
})
export class ManagerLeadsUiPagesModule {}
