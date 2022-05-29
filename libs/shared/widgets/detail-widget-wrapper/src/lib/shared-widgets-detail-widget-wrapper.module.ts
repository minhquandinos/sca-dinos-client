import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DayPresetsModule } from '@scaleo/shared/components';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { DetailWidgetWrapperComponent } from './detail-widget-wrapper.component';

@NgModule({
    declarations: [DetailWidgetWrapperComponent],
    exports: [DetailWidgetWrapperComponent],
    imports: [CommonModule, SharedModule, UiPageWrapperModule, DayPresetsModule]
})
export class SharedWidgetsDetailWidgetWrapperModule {}
