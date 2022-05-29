import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { NotificationHeaderModule } from '@scaleo/shared/components';

import { TrialNotificationMessageComponent } from './trial-notification-message.component';

@NgModule({
    imports: [CommonModule, NotificationHeaderModule, SharedModule],
    declarations: [TrialNotificationMessageComponent]
})
export class TrialNotificationMessageModule {}
