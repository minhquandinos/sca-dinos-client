import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { UiStatusDotModule } from '@scaleo/ui-kit/elements';

import { StatusDotColorComponent } from './status-dot-color.component';

@NgModule({
    declarations: [StatusDotColorComponent],
    imports: [CommonModule, UiStatusDotModule, PlatformStatusesModule],
    exports: [StatusDotColorComponent]
})
export class StatusDotColorModule {}
