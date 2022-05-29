import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerLeadsReceiveNavigationComponent } from './manager-leads-receive-navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, UiTabNavBarModule, SharedModule],
    declarations: [ManagerLeadsReceiveNavigationComponent]
})
export class ManagerLeadsReceiveNavigationModule {}
