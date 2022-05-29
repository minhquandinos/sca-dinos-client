import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ReceiveLeadsLayoutComponent } from './receive-leads-layout/receive-leads-layout.component';

@NgModule({
    imports: [CommonModule, PortalModule, RouterModule, UiPageWrapperModule],
    declarations: [ReceiveLeadsLayoutComponent],
    exports: [ReceiveLeadsLayoutComponent]
})
export class FeatureManagerLeadsLayoutsModule {}
