import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformCalendlyModule } from '@scaleo/platform/calendly/component';
import { UiButtonLinkModule, UiImageModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ScheduleCallComponent } from './schedule-call.component';

@NgModule({
    declarations: [ScheduleCallComponent],
    exports: [ScheduleCallComponent],
    imports: [CommonModule, UiPageWrapperModule, UiButtonLinkModule, SharedModule, UiImageModule, PlatformCalendlyModule]
})
export class ScheduleCallModule {}
