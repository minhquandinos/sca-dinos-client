import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { NotificationHeaderModule, UpgradePlanInfoModule } from '@scaleo/shared/components';

import { SmartLinkNotifyUpgradePlanComponent } from './smart-link-notify-upgrade-plan.component';

@NgModule({
    imports: [CommonModule, NotificationHeaderModule, UpgradePlanInfoModule, SharedModule],
    declarations: [SmartLinkNotifyUpgradePlanComponent],
    exports: [SmartLinkNotifyUpgradePlanComponent]
})
export class OfferSmartLinkNotifyUpgradePlanModule {}
