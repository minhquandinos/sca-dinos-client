import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ManagerLeadsReceiveRoutingModule } from './manager-leads-receive-routing.module';

@NgModule({
    imports: [CommonModule, UiPageWrapperModule, UiButtonLinkModule, ManagerLeadsReceiveRoutingModule]
})
export class ManagerLeadsReceivePagesModule {}
