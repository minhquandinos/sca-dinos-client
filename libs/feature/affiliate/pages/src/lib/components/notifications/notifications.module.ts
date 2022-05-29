import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { NotificationsComponent } from './notifications.component';

@NgModule({
    declarations: [NotificationsComponent],
    exports: [NotificationsComponent],
    imports: [CommonModule, UiButtonLinkModule]
})
export class NotificationsModule {}
