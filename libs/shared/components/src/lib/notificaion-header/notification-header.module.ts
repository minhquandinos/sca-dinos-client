import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { NotificationHeaderComponent } from './notification-header.component';

@NgModule({
    declarations: [NotificationHeaderComponent],
    imports: [CommonModule, UiSvgIconModule],
    exports: [NotificationHeaderComponent]
})
export class NotificationHeaderModule {}
