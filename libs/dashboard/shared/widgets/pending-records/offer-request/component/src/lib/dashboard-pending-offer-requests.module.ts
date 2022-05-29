import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiPageWrapperModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { DashboardPendingOfferRequestsComponent } from './dashboard-pending-offer-requests.component';

@NgModule({
    declarations: [DashboardPendingOfferRequestsComponent],
    imports: [CommonModule, SharedModule, UiPageWrapperModule, UiSimpleTableModule],
    exports: [DashboardPendingOfferRequestsComponent]
})
export class DashboardPendingOfferRequestsModule {}
